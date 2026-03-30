export const LESSON_RUNTIME_SOURCE = Object.freeze({
  PUBLISHED: 'published',
  PLAYABLE_DRAFT: 'playable-draft',
  PLAYABLE_DRAFT_BACKUP: 'playable-draft-backup',
  BROKEN_DRAFT_FALLBACK: 'broken-draft-fallback'
});

export const LESSON_RUNTIME_SOURCE_LABELS = Object.freeze({
  PUBLISHED: 'Published Lesson · shipped package',
  PLAYABLE_DRAFT: 'Playable Draft',
  PLAYABLE_DRAFT_BACKUP: 'Playable Draft Backup',
  BROKEN_DRAFT_FALLBACK: 'Broken Draft Fallback · Shipped lesson package'
});

export function readLessonRuntimeLabel(lesson) {
  if (typeof lesson?.lessonRuntimeSourceLabel === 'string' && lesson.lessonRuntimeSourceLabel.trim()) {
    return lesson.lessonRuntimeSourceLabel.trim();
  }

  if (lesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT) {
    return LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT;
  }

  if (lesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP) {
    return LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT_BACKUP;
  }

  if (lesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK) {
    return LESSON_RUNTIME_SOURCE_LABELS.BROKEN_DRAFT_FALLBACK;
  }

  return LESSON_RUNTIME_SOURCE_LABELS.PUBLISHED;
}

export function readLessonRuntimeTone(lesson) {
  if (lesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT) {
    return 'success';
  }

  if (lesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP) {
    return 'warning';
  }

  if (lesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK) {
    return 'warning';
  }

  return 'accent';
}

export function readPlayableDraftRuntimeLabel(updatedAt, persistenceLabel = 'SQLite') {
  const normalizedUpdatedAt = String(updatedAt || '').trim();
  const normalizedPersistenceLabel = String(persistenceLabel || '').trim() || 'SQLite';

  return normalizedUpdatedAt
    ? `Playable Draft · ${normalizedPersistenceLabel} · ${normalizedUpdatedAt}`
    : `Playable Draft · ${normalizedPersistenceLabel}`;
}

export function readAuthoringSaveState({ hasDraft, dirty }) {
  if (!hasDraft) {
    return {
      label: 'No Draft',
      tone: 'muted'
    };
  }

  return dirty
    ? {
        label: 'Unsaved Changes',
        tone: 'warning'
      }
    : {
        label: 'Draft Saved',
        tone: 'success'
      };
}

export function readAuthoringCompileState({
  hasDraft,
  analysisPending,
  parseErrorMessage,
  compileErrorMessage,
  compiledLesson,
  hasShippedFallback
}) {
  if (!hasDraft) {
    return {
      label: 'No Draft',
      tone: 'muted'
    };
  }

  if (analysisPending) {
    return {
      label: 'Checking Playability…',
      tone: 'muted'
    };
  }

  if (parseErrorMessage || compileErrorMessage) {
    return {
      label: hasShippedFallback ? 'Broken Draft Fallback' : 'Broken Draft',
      tone: 'danger'
    };
  }

  if (compiledLesson) {
    return {
      label: `Playable Draft · ${compiledLesson.steps.length} steps`,
      tone: 'success'
    };
  }

  return {
    label: 'Draft Not Ready',
    tone: 'muted'
  };
}

export function readAuthoringPublishState({ hasDraft, versionCount }) {
  if (!hasDraft) {
    return {
      label: 'No Draft',
      tone: 'muted'
    };
  }

  if (versionCount > 0) {
    return {
      label: 'Published Lesson',
      tone: 'success'
    };
  }

  return {
    label: 'Not Published',
    tone: 'muted'
  };
}
