function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readStepNode(editorContext, stepId) {
  return editorContext?.steps?.find(step => step.stepId === stepId) || null;
}

function readSceneNode(editorContext, stepId, sceneId) {
  const stepNode = readStepNode(editorContext, stepId);

  return stepNode?.scenes?.find(scene => scene.sceneId === sceneId) || null;
}

function readSceneSectionNode(editorContext, stepId, sceneId, matchSection) {
  const sceneNode = readSceneNode(editorContext, stepId, sceneId);

  if (!sceneNode || typeof matchSection !== 'function') {
    return null;
  }

  return sceneNode.sections.find(section => matchSection(normalizeText(section.heading))) || null;
}

function findLineNumber(lines, pattern, startIndex = 0) {
  for (let lineIndex = Math.max(0, startIndex); lineIndex < lines.length; lineIndex += 1) {
    if (pattern.test(lines[lineIndex])) {
      return lineIndex + 1;
    }
  }

  return 1;
}

function findNestedFrontmatterLine(lines, parentField, childField) {
  const parentLineNumber = findLineNumber(lines, new RegExp(`^${escapeRegExp(parentField)}:\\s*$`));
  const parentLineIndex = Math.max(0, parentLineNumber - 1);

  for (let lineIndex = parentLineIndex + 1; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];

    if (/^---\s*$/.test(line)) {
      break;
    }

    if (/^\S/.test(line)) {
      break;
    }

    if (new RegExp(`^\\s+${escapeRegExp(childField)}:\\s*`).test(line)) {
      return lineIndex + 1;
    }
  }

  return parentLineNumber;
}

function resolveFrontmatterLocation(editorContext, fieldPath = '') {
  const lines = Array.isArray(editorContext?.lines) ? editorContext.lines : [];
  const normalizedFieldPath = normalizeText(fieldPath);

  if (!normalizedFieldPath) {
    return {
      lineNumber: 1,
      contextLabel: 'Metadata'
    };
  }

  if (normalizedFieldPath === 'artifacts') {
    return {
      lineNumber: findLineNumber(lines, /^artifacts:\s*$/),
      contextLabel: 'Metadata · artifacts'
    };
  }

  if (normalizedFieldPath.includes('.')) {
    const [parentField, childField] = normalizedFieldPath.split('.');

    return {
      lineNumber: findNestedFrontmatterLine(lines, parentField, childField),
      contextLabel: `Metadata · ${normalizedFieldPath}`
    };
  }

  return {
    lineNumber: findLineNumber(lines, new RegExp(`^${escapeRegExp(normalizedFieldPath)}:\\s*`)),
    contextLabel: `Metadata · ${normalizedFieldPath}`
  };
}

function readMetadataLocationFromMessage(editorContext, message) {
  const rawMessage = String(message || '');
  const missingFieldMatch = rawMessage.match(/^lesson\.script\.md must define ([\w.]+)\.$/);

  if (missingFieldMatch) {
    return resolveFrontmatterLocation(editorContext, missingFieldMatch[1]);
  }

  if (rawMessage === 'lesson.script.md must define a preview object.') {
    return resolveFrontmatterLocation(editorContext, 'preview');
  }

  if (rawMessage === 'lesson.script.md must declare at least one artifact.') {
    return resolveFrontmatterLocation(editorContext, 'artifacts');
  }

  if (rawMessage.includes('lesson.script.md status')) {
    return resolveFrontmatterLocation(editorContext, 'status');
  }

  if (rawMessage.includes('lesson.script.md order')) {
    return resolveFrontmatterLocation(editorContext, 'order');
  }

  if (rawMessage.includes('lesson.script.md preview.type')) {
    return resolveFrontmatterLocation(editorContext, 'preview.type');
  }

  if (rawMessage.includes('theory.file')) {
    return resolveFrontmatterLocation(editorContext, 'theory.file');
  }

  if (
    rawMessage.startsWith('Artifact declaration at index ')
    || rawMessage.includes('Artifact "')
    || rawMessage.startsWith('Each lesson.script.md artifact declaration')
    || rawMessage.includes('Artifact ID must use kebab-case')
  ) {
    return resolveFrontmatterLocation(editorContext, 'artifacts');
  }

  if (rawMessage.includes('lesson.script.md')) {
    return resolveFrontmatterLocation(editorContext);
  }

  return null;
}

export function resolveAuthoringDiagnosticLocation(editorContext, message) {
  const rawMessage = String(message || '');
  const metadataLocation = readMetadataLocationFromMessage(editorContext, rawMessage);

  if (metadataLocation) {
    return metadataLocation;
  }

  const sceneMatch = rawMessage.match(/Scene "([^"]+)" in step "([^"]+)"/);

  if (sceneMatch) {
    const stepId = sceneMatch[2];
    const sceneId = sceneMatch[1];
    const sceneNode = readSceneNode(editorContext, stepId, sceneId);
    const showCodeMatch = rawMessage.match(/"Show Code:\s*([^"]+)"/);
    const referencesNarration = rawMessage.includes('"Narration"') || rawMessage.includes('define narration');
    const referencesPreview = rawMessage.toLowerCase().includes('preview');
    const referencesTheory = rawMessage.toLowerCase().includes('theory');

    if (showCodeMatch) {
      const sectionNode = readSceneSectionNode(
        editorContext,
        stepId,
        sceneId,
        heading => heading.toLowerCase() === `show code: ${normalizeText(showCodeMatch[1]).toLowerCase()}`
      );

      if (sectionNode) {
        return {
          lineNumber: sectionNode.lineNumber,
          contextLabel: sectionNode.heading
        };
      }
    }

    if (referencesNarration) {
      const sectionNode = readSceneSectionNode(
        editorContext,
        stepId,
        sceneId,
        heading => heading.toLowerCase() === 'narration'
      );

      if (sectionNode) {
        return {
          lineNumber: sectionNode.lineNumber,
          contextLabel: sectionNode.heading
        };
      }
    }

    if (referencesPreview) {
      const sectionNode = readSceneSectionNode(
        editorContext,
        stepId,
        sceneId,
        heading => heading.toLowerCase() === 'preview'
      );

      if (sectionNode) {
        return {
          lineNumber: sectionNode.lineNumber,
          contextLabel: sectionNode.heading
        };
      }
    }

    if (referencesTheory) {
      const sectionNode = readSceneSectionNode(
        editorContext,
        stepId,
        sceneId,
        heading => heading.toLowerCase() === 'theory'
      );

      if (sectionNode) {
        return {
          lineNumber: sectionNode.lineNumber,
          contextLabel: sectionNode.heading
        };
      }
    }

    if (sceneNode) {
      return {
        lineNumber: sceneNode.lineNumber,
        contextLabel: sceneNode.title || sceneNode.sceneId
      };
    }
  }

  const stepMatch = rawMessage.match(/Step "([^"]+)"/);

  if (stepMatch) {
    const stepNode = readStepNode(editorContext, stepMatch[1]);

    if (stepNode) {
      return {
        lineNumber: stepNode.lineNumber,
        contextLabel: stepNode.title || stepNode.stepId
      };
    }
  }

  return {
    lineNumber: editorContext?.context?.lineNumber || 1,
    contextLabel: editorContext?.context?.stepIndex >= 0
      ? `Step ${editorContext.context.stepIndex + 1}`
      : 'Lesson script'
  };
}

function buildMetadataMessage(fieldName) {
  return `U Metadata drawer-u nedostaje "${fieldName}". Otvori Metadata i popuni to polje.`;
}

function buildHumanDiagnosticMessage(rawMessage) {
  const message = String(rawMessage || '').trim();
  const missingFieldMatch = message.match(/^lesson\.script\.md must define ([\w.]+)\.$/);

  if (missingFieldMatch) {
    return buildMetadataMessage(missingFieldMatch[1]);
  }

  if (message === 'lesson.script.md must define a preview object.') {
    return 'U Metadata drawer-u nedostaje ceo "preview" blok. Otvori Metadata i popuni Preview type, title i address.';
  }

  if (message === 'lesson.script.md must declare at least one artifact.') {
    return 'Lekcija nema nijedan artifact. Otvori Metadata i dodaj bar jedan artifact koji scena može da koristi.';
  }

  const sceneBeforeStepMatch = message.match(/^Scene heading "([^"]+)" appears before any step heading\.$/);

  if (sceneBeforeStepMatch) {
    return `Scene "${sceneBeforeStepMatch[1]}" je upisana pre prvog Step-a. Prvo dodaj "# Step: ..." pa tek onda "## Scene: ...".`;
  }

  if (message === 'Each "Step" heading must define a step id.') {
    return 'Step heading nema id. Napiši ga kao "# Step: moj-step-id".';
  }

  if (message === 'lesson.script.md body must start with a step heading.') {
    return 'Telo lekcije mora da počne sa "# Step: ...". Trenutno pre prvog step-a postoji nepodržan sadržaj.';
  }

  if (message === 'lesson.script.md must declare at least one step.') {
    return 'Lekcija nema nijedan Step. Dodaj bar jedan "# Step: ..." blok da bi tok mogao da krene.';
  }

  const missingSceneIdMatch = message.match(/^Step "([^"]+)" contains a scene without a scene id\.$/);

  if (missingSceneIdMatch) {
    return `U step-u "${missingSceneIdMatch[1]}" postoji scene bez id-a. Napiši heading kao "## Scene: moj-scene-id".`;
  }

  const sceneSectionBeforeSceneMatch = message.match(/^Step "([^"]+)" contains a scene section before any scene heading\.$/);

  if (sceneSectionBeforeSceneMatch) {
    return `U step-u "${sceneSectionBeforeSceneMatch[1]}" postoji sekcija pre scene. Dodaj "## Scene: ..." pre Narration ili Show Code blokova.`;
  }

  const missingSceneStartMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must start with a "Narration" or "Show Code" section\.$/);

  if (missingSceneStartMatch) {
    return `Scena "${missingSceneStartMatch[1]}" mora da krene sa "### Narration" ili "### Show Code: ...". Trenutno prvi blok u sceni nije podržan.`;
  }

  const stepNoSceneMatch = message.match(/^Step "([^"]+)" must contain at least one scene\.$/);

  if (stepNoSceneMatch) {
    return `Step "${stepNoSceneMatch[1]}" nema nijednu scenu. Dodaj bar jedan "## Scene: ..." blok unutar stepa.`;
  }

  const duplicateSceneMatch = message.match(/^Step "([^"]+)" defines scene "([^"]+)" more than once\.$/);

  if (duplicateSceneMatch) {
    return `Step "${duplicateSceneMatch[1]}" ima dupliranu scenu "${duplicateSceneMatch[2]}". Zadrži samo jedan scene id u istom step-u.`;
  }

  const stepFieldMatch = message.match(/^Step "([^"]+)" must define (title|summary|intent)\.$/);

  if (stepFieldMatch) {
    return `Step "${stepFieldMatch[1]}" nema "${stepFieldMatch[2]}:". Dodaj to polje odmah ispod step heading-a.`;
  }

  const unsupportedStepFieldMatch = message.match(/^Step "([^"]+)" uses unsupported metadata field "([^"]+)"\.$/);

  if (unsupportedStepFieldMatch) {
    return `Step "${unsupportedStepFieldMatch[1]}" koristi nepodržano polje "${unsupportedStepFieldMatch[2]}". Koristi samo dozvoljena step polja kao title, summary i intent.`;
  }

  const unsupportedStepContentMatch = message.match(/^Step "([^"]+)" contains unsupported metadata content: "(.+)"\.$/);

  if (unsupportedStepContentMatch) {
    return `U step-u "${unsupportedStepContentMatch[1]}" postoji red koji ne pripada step metadata delu: "${unsupportedStepContentMatch[2]}".`;
  }

  const focusNeedlesMatch = message.match(/^Step "([^"]+)" must express focusHtmlNeedles as a YAML list item\.$/);

  if (focusNeedlesMatch) {
    return `Step "${focusNeedlesMatch[1]}" mora da piše "focusHtmlNeedles" kao YAML listu sa crtama, ne kao običan tekst.`;
  }

  const missingNarrationMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must define(?: a "Narration" section| narration)\.$/);

  if (missingNarrationMatch) {
    return `Sceni "${missingNarrationMatch[1]}" fali "### Narration". Dodaj taj blok i ispod napiši objašnjenje za scenu.`;
  }

  const missingShowCodeMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must define at least one "Show Code" section\.$/);

  if (missingShowCodeMatch) {
    return `Sceni "${missingShowCodeMatch[1]}" fali makar jedan "### Show Code: ..." blok. Dodaj kod koji ta scena prikazuje.`;
  }

  const missingArtifactNameMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must name the artifact in "Show Code: <artifactId>"\.$/);

  if (missingArtifactNameMatch) {
    return `U sceni "${missingArtifactNameMatch[1]}" Show Code heading nema artifact id. Napiši ga kao "### Show Code: html" ili drugi važeći artifact id.`;
  }

  const wrappedCodeMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must wrap "Show Code: ([^"]+)" in a fenced code block\.$/);

  if (wrappedCodeMatch) {
    return `Show Code blok za "${wrappedCodeMatch[3]}" nije pravilno zatvoren. Otvori ga sa \`\`\` i zatvori sa \`\`\` oko koda.`;
  }

  const codeFenceMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must use a ([\w-]+) code fence for artifact "([^"]+)"\.$/);

  if (codeFenceMatch) {
    return `Show Code blok za "${codeFenceMatch[4]}" koristi pogrešan code fence. Za ovaj artifact koristi \`\`\`${codeFenceMatch[3]}\`.`;
  }

  const unknownArtifactMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" references unknown(?: active)? artifact "([^"]+)"\.$/);

  if (unknownArtifactMatch) {
    return `Scena "${unknownArtifactMatch[1]}" koristi nepoznat artifact "${unknownArtifactMatch[3]}". Dodaj taj artifact u Metadata ili koristi postojeći artifact id.`;
  }

  const unsupportedSectionMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" uses unsupported section "([^"]+)"\.$/);

  if (unsupportedSectionMatch) {
    return `Scena "${unsupportedSectionMatch[1]}" koristi nepodržanu sekciju "${unsupportedSectionMatch[3]}". Koristi Narration, Show Code, Preview ili Theory.`;
  }

  const duplicateSectionMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" defines "([^"]+)" more than once\.$/);

  if (duplicateSectionMatch) {
    return `Scena "${duplicateSectionMatch[1]}" duplira sekciju "${duplicateSectionMatch[3]}". Zadrži samo jedan isti blok u istoj sceni.`;
  }

  const previewObjectMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must define preview as an object\.$/);

  if (previewObjectMatch) {
    return `Preview blok u sceni "${previewObjectMatch[1]}" nije validan YAML objekat. Koristi redove kao "action:" i "target:".`;
  }

  const previewTargetMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must define preview\.target when preview\.action is "([^"]+)"\.$/);

  if (previewTargetMatch) {
    return `Preview blok u sceni "${previewTargetMatch[1]}" nema "target:" za action "${previewTargetMatch[3]}". Dodaj target koji preview treba da menja.`;
  }

  const previewYamlMatch = message.match(/^Failed to parse preview in scene "([^"]+)": (.+)$/);

  if (previewYamlMatch) {
    return `Preview blok u sceni "${previewYamlMatch[1]}" nije dobar YAML. Proveri uvlačenje i format polja kao "action:" i "target:".`;
  }

  const theoryObjectMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must define theory as an object\.$/);

  if (theoryObjectMatch) {
    return `Theory blok u sceni "${theoryObjectMatch[1]}" nije validan YAML objekat. Koristi red kao "anchor: ...".`;
  }

  const theoryAnchorMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" must define theory\.anchor\.$/);

  if (theoryAnchorMatch) {
    return `Theory blok u sceni "${theoryAnchorMatch[1]}" nema "anchor:". Dodaj anchor koji postoji u theory sadržaju.`;
  }

  const theoryYamlMatch = message.match(/^Failed to parse theory in scene "([^"]+)": (.+)$/);

  if (theoryYamlMatch) {
    return `Theory blok u sceni "${theoryYamlMatch[1]}" nije dobar YAML. Proveri uvlačenje i napiši "anchor: ..." u zasebnom redu.`;
  }

  const theoryDisabledMatch = message.match(/^Lesson scenes reference theory anchors, but the lesson manifest does not enable theory\.$/);

  if (theoryDisabledMatch) {
    return 'Neka scena koristi Theory anchor, ali Metadata nema uključen theory režim. U Metadata uključi theory ili ukloni theory reference iz scene.';
  }

  const missingTheoryMarkdownMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" references theory\.anchor "([^"]+)" but theory\.md was not provided\.$/);

  if (missingTheoryMarkdownMatch) {
    return `Scena "${missingTheoryMarkdownMatch[1]}" traži theory anchor "${missingTheoryMarkdownMatch[3]}", ali nema theory sadržaja za tu lekciju.`;
  }

  const unknownTheoryAnchorMatch = message.match(/^Scene "([^"]+)" in step "([^"]+)" references unknown theory\.anchor "([^"]+)"\.$/);

  if (unknownTheoryAnchorMatch) {
    return `Scena "${unknownTheoryAnchorMatch[1]}" koristi theory anchor "${unknownTheoryAnchorMatch[3]}" koji ne postoji u theory sadržaju.`;
  }

  const theoryFileMatch = message.match(/^lesson\.script\.md must define theory\.file when theory\.enabled is true\.$/);

  if (theoryFileMatch) {
    return buildMetadataMessage('theory.file');
  }

  const missingTheoryMarkdownCompileMatch = message.match(/^lesson\.script\.md declares theory\.enabled=true but no theoryMarkdown was provided\.$/);

  if (missingTheoryMarkdownCompileMatch) {
    return 'Theory je uključen u Metadata, ali uz lekciju nema theory sadržaja koji može da se kompajlira.';
  }

  const invalidOneOfMatch = message.match(/^(.+?) must be one of: (.+)\.$/);

  if (invalidOneOfMatch) {
    return `${invalidOneOfMatch[1]} ima nevažeću vrednost. Koristi jednu od dozvoljenih opcija: ${invalidOneOfMatch[2]}.`;
  }

  const positiveIntegerMatch = message.match(/^(.+?) must be a positive integer\.$/);

  if (positiveIntegerMatch) {
    return `${positiveIntegerMatch[1]} mora da bude pozitivan ceo broj.`;
  }

  const kebabCaseMatch = message.match(/^(.+?) must use kebab-case\. Received "([^"]+)"\.$/);

  if (kebabCaseMatch) {
    return `${kebabCaseMatch[1]} mora da bude u kebab-case formatu. Zameni "${kebabCaseMatch[2]}" vrednošću kao "primer-id".`;
  }

  return `Ovaj deo lekcije nije validan po trenutnim pravilima. ${message}`;
}

function createAuthoringDiagnostic(originLabel, editorContext, rawMessage) {
  const location = resolveAuthoringDiagnosticLocation(editorContext, rawMessage);

  return {
    tone: 'danger',
    label: originLabel,
    rawMessage,
    humanMessage: buildHumanDiagnosticMessage(rawMessage),
    lineNumber: location.lineNumber,
    contextLabel: location.contextLabel
  };
}

export function readAuthoringDiagnostics({
  analysisPending = false,
  analysis = null
} = {}) {
  if (analysisPending) {
    return [];
  }

  const diagnostics = [];
  const editorContext = analysis?.editorContext || null;

  if (analysis?.parseErrorMessage) {
    diagnostics.push(createAuthoringDiagnostic('Syntax', editorContext, analysis.parseErrorMessage));
  }

  if (analysis?.compileErrorMessage) {
    diagnostics.push(createAuthoringDiagnostic('Compile', editorContext, analysis.compileErrorMessage));
  }

  return diagnostics;
}
