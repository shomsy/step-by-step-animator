import { escapeInlineText } from '../escape-inline-text.js';

export function showKnowledgeCheckQuestion({
  lessonParts,
  question,
  currentQuestionNumber,
  totalQuestions
}) {
  lessonParts.knowledgeCheckContent.innerHTML = `
    <div class="quiz-question">
      <h3>Pitanje ${currentQuestionNumber + 1}/${totalQuestions}: ${escapeInlineText(question.question)}</h3>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button class="quiz-option" type="button" data-answer-index="${index}">
            <div class="quiz-option-letter">${String.fromCharCode(65 + index)}</div>
            <span>${escapeInlineText(option)}</span>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="quiz-actions">
      <button class="btn-secondary" type="button" data-action="close-knowledge-check">Zatvori</button>
    </div>
  `;
}
