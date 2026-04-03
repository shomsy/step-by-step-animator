const BACKUP_ROOT_DIRECTORY_NAME = 'authoring-draft-backups';
const BACKUP_VERSION_DIRECTORY_NAME = 'v1';
const BACKUP_MARKDOWN_FILE_NAME = 'lesson.script.md';
const BACKUP_METADATA_FILE_NAME = 'draft.backup.json';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function readBackupOrderValue(timestamp) {
  const parsedTimestamp = Date.parse(normalizeText(timestamp));

  return Number.isNaN(parsedTimestamp) ? 0 : parsedTimestamp;
}

function buildBackupLocation(draftId) {
  return `browser://${BACKUP_ROOT_DIRECTORY_NAME}/${BACKUP_VERSION_DIRECTORY_NAME}/${draftId}/${BACKUP_MARKDOWN_FILE_NAME}`;
}

function buildUnavailableBackupStatus() {
  return {
    status: 'unavailable',
    backupFileName: BACKUP_MARKDOWN_FILE_NAME,
    backupLocation: '',
  };
}

function buildWrittenBackupStatus(draftId) {
  return {
    status: 'written',
    backupFileName: BACKUP_MARKDOWN_FILE_NAME,
    backupLocation: buildBackupLocation(draftId),
  };
}

function buildRemovedBackupStatus() {
  return {
    status: 'removed',
    backupFileName: BACKUP_MARKDOWN_FILE_NAME,
    backupLocation: '',
  };
}

function sanitizeBackupMetadata(rawMetadata) {
  return {
    draftId: normalizeText(rawMetadata?.draftId),
    lessonId: normalizeText(rawMetadata?.lessonId),
    lessonTitle: normalizeText(rawMetadata?.lessonTitle),
    shippedLessonId: normalizeText(rawMetadata?.shippedLessonId),
    sourceOrigin: normalizeText(rawMetadata?.sourceOrigin) || 'custom',
    createdAt: normalizeText(rawMetadata?.createdAt),
    updatedAt: normalizeText(rawMetadata?.updatedAt),
    tracksShippedSource: rawMetadata?.tracksShippedSource === true,
  };
}

async function readHandleText(fileHandle) {
  const file = await fileHandle.getFile();
  return file.text();
}

async function writeHandleText(fileHandle, text) {
  const writable = await fileHandle.createWritable();

  try {
    await writable.write(String(text || ''));
    await writable.close();
  } catch (error) {
    try {
      await writable.abort();
    } catch {
      // Ignore secondary abort failures so the original write error stays visible.
    }

    throw error;
  }
}

async function readDirectoryEntries(directoryHandle) {
  const entries = [];

  for await (const [name, handle] of directoryHandle.entries()) {
    entries.push({
      name,
      handle,
    });
  }

  return entries;
}

function readSelectionMatch(backupRecord, { requestedLessonId = '', shippedLessonId = '' }) {
  const normalizedRequestedLessonId = normalizeText(requestedLessonId);
  const normalizedShippedLessonId = normalizeText(shippedLessonId);

  if (normalizedShippedLessonId) {
    return backupRecord.shippedLessonId === normalizedShippedLessonId;
  }

  if (!normalizedRequestedLessonId) {
    return false;
  }

  if (!backupRecord.shippedLessonId) {
    return backupRecord.lessonId === normalizedRequestedLessonId;
  }

  return backupRecord.shippedLessonId === normalizedRequestedLessonId;
}

function buildDraftBackupRecord(metadata, sourceMarkdown) {
  return {
    draftId: metadata.draftId,
    lessonId: metadata.lessonId,
    lessonTitle: metadata.lessonTitle,
    shippedLessonId: metadata.shippedLessonId,
    sourceOrigin: metadata.sourceOrigin,
    createdAt: metadata.createdAt,
    updatedAt: metadata.updatedAt,
    tracksShippedSource: metadata.tracksShippedSource,
    sourceMarkdown,
    backupFileName: BACKUP_MARKDOWN_FILE_NAME,
    backupLocation: buildBackupLocation(metadata.draftId),
  };
}

async function openBackupRootDirectory(ownerWindow, { create = false } = {}) {
  const storageDirectoryFactory = ownerWindow?.navigator?.storage?.getDirectory;

  if (typeof storageDirectoryFactory !== 'function') {
    return null;
  }

  const storageRoot = await storageDirectoryFactory.call(ownerWindow.navigator.storage);

  try {
    const authoringRoot = await storageRoot.getDirectoryHandle(BACKUP_ROOT_DIRECTORY_NAME, {
      create,
    });

    return authoringRoot.getDirectoryHandle(BACKUP_VERSION_DIRECTORY_NAME, {
      create,
    });
  } catch (error) {
    if (!create && error?.name === 'NotFoundError') {
      return null;
    }

    throw error;
  }
}

function createUnavailableAuthoringLessonBackup() {
  return {
    isAvailable() {
      return false;
    },
    async writeDraftBackup() {
      return buildUnavailableBackupStatus();
    },
    async removeDraftBackup() {
      return buildUnavailableBackupStatus();
    },
    async readDraftBackups() {
      return [];
    },
    async readLatestDraftBackup() {
      return null;
    },
  };
}

export async function openAuthoringLessonBackup({ ownerWindow }) {
  if (!ownerWindow?.navigator?.storage?.getDirectory) {
    return createUnavailableAuthoringLessonBackup();
  }

  async function readBackupRootDirectory() {
    return openBackupRootDirectory(ownerWindow, {
      create: false,
    });
  }

  async function createBackupRootDirectory() {
    return openBackupRootDirectory(ownerWindow, {
      create: true,
    });
  }

  async function readDraftBackups() {
    const backupRootDirectory = await readBackupRootDirectory();

    if (!backupRootDirectory) {
      return [];
    }

    const draftBackups = [];
    const draftDirectoryEntries = await readDirectoryEntries(backupRootDirectory);

    for (const entry of draftDirectoryEntries) {
      if (entry.handle.kind !== 'directory') {
        continue;
      }

      try {
        const metadataFileHandle = await entry.handle.getFileHandle(BACKUP_METADATA_FILE_NAME);
        const markdownFileHandle = await entry.handle.getFileHandle(BACKUP_MARKDOWN_FILE_NAME);
        const metadata = sanitizeBackupMetadata(
          JSON.parse(await readHandleText(metadataFileHandle))
        );
        const sourceMarkdown = await readHandleText(markdownFileHandle);

        if (!metadata.draftId || !normalizeText(sourceMarkdown)) {
          continue;
        }

        draftBackups.push(buildDraftBackupRecord(metadata, sourceMarkdown));
      } catch {
        // Ignore unreadable backup entries so one broken backup does not hide the rest.
      }
    }

    return draftBackups.sort((left, right) => {
      const updatedDifference =
        readBackupOrderValue(right.updatedAt) - readBackupOrderValue(left.updatedAt);

      if (updatedDifference !== 0) {
        return updatedDifference;
      }

      return left.draftId.localeCompare(right.draftId);
    });
  }

  return {
    isAvailable() {
      return true;
    },
    async writeDraftBackup({
      draftId,
      lessonId,
      lessonTitle,
      sourceMarkdown,
      sourceOrigin,
      shippedLessonId = '',
      createdAt = '',
      updatedAt = '',
      tracksShippedSource = false,
    }) {
      const normalizedDraftId = normalizeText(draftId);

      if (!normalizedDraftId) {
        throw new Error('Draft backup requires a draft id.');
      }

      const backupRootDirectory = await createBackupRootDirectory();
      const draftDirectory = await backupRootDirectory.getDirectoryHandle(normalizedDraftId, {
        create: true,
      });
      const markdownFileHandle = await draftDirectory.getFileHandle(BACKUP_MARKDOWN_FILE_NAME, {
        create: true,
      });
      const metadataFileHandle = await draftDirectory.getFileHandle(BACKUP_METADATA_FILE_NAME, {
        create: true,
      });

      await writeHandleText(markdownFileHandle, sourceMarkdown);
      await writeHandleText(
        metadataFileHandle,
        JSON.stringify(
          {
            draftId: normalizedDraftId,
            lessonId: normalizeText(lessonId),
            lessonTitle: normalizeText(lessonTitle),
            shippedLessonId: normalizeText(shippedLessonId),
            sourceOrigin: normalizeText(sourceOrigin) || 'custom',
            createdAt: normalizeText(createdAt),
            updatedAt: normalizeText(updatedAt),
            tracksShippedSource: tracksShippedSource === true,
          },
          null,
          2
        )
      );

      return buildWrittenBackupStatus(normalizedDraftId);
    },
    async removeDraftBackup(draftId) {
      const normalizedDraftId = normalizeText(draftId);

      if (!normalizedDraftId) {
        return buildRemovedBackupStatus();
      }

      const backupRootDirectory = await readBackupRootDirectory();

      if (!backupRootDirectory) {
        return buildRemovedBackupStatus();
      }

      try {
        await backupRootDirectory.removeEntry(normalizedDraftId, {
          recursive: true,
        });
      } catch (error) {
        if (error?.name !== 'NotFoundError') {
          throw error;
        }
      }

      return buildRemovedBackupStatus();
    },
    readDraftBackups,
    async readLatestDraftBackup(selection) {
      const draftBackups = await readDraftBackups();

      return (
        draftBackups.find((backupRecord) => readSelectionMatch(backupRecord, selection)) || null
      );
    },
  };
}

export async function readPersistedPlayableDraftBackup({
  ownerWindow,
  requestedLessonId = '',
  shippedLessonId = '',
}) {
  if (!ownerWindow) {
    return null;
  }

  const lessonBackup = await openAuthoringLessonBackup({
    ownerWindow,
  });

  return lessonBackup.readLatestDraftBackup({
    requestedLessonId,
    shippedLessonId,
  });
}
