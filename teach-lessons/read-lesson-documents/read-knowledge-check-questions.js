export function readKnowledgeCheckQuestions(markdown) {
  if (!markdown) {
    return [];
  }

  const questions = [];
  let activeQuestion = null;

  String(markdown).split('\n').forEach(line => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return;
    }

    if (trimmedLine.startsWith('## ')) {
      if (activeQuestion) {
        questions.push(activeQuestion);
      }

      activeQuestion = {
        question: '',
        options: [],
        correct: -1
      };
      return;
    }

    if (!activeQuestion) {
      return;
    }

    if (trimmedLine.startsWith('? ')) {
      activeQuestion.question = trimmedLine.slice(2).trim();
      return;
    }

    const optionMatch = trimmedLine.match(/^-\s+\[(x| )\]\s+(.+)$/i);

    if (optionMatch) {
      const [, marker, label] = optionMatch;

      if (marker.toLowerCase() === 'x') {
        activeQuestion.correct = activeQuestion.options.length;
      }

      activeQuestion.options.push(label.trim());
      return;
    }

    if (trimmedLine.startsWith('! ')) {
      activeQuestion.explanation = trimmedLine.slice(2).trim();
    }
  });

  if (activeQuestion) {
    questions.push(activeQuestion);
  }

  return questions.filter(question =>
    question.question &&
    question.options.length > 0 &&
    question.correct >= 0
  );
}
