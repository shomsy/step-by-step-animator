export function showKnowledgeCheckScore({
  lessonParts,
  correctAnswerCount,
  totalQuestions
}) {
  const percentage = Math.round((correctAnswerCount / totalQuestions) * 100);
  const summaryIcon = percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚';

  lessonParts.knowledgeCheckContent.innerHTML = `
    <div class="quiz-score">
      <h2>${summaryIcon} ${percentage}%</h2>
      <p>Odgovorili ste tačno na ${correctAnswerCount} od ${totalQuestions} pitanja.</p>
    </div>
    <div class="quiz-actions">
      <button class="btn-primary" type="button" data-action="restart-knowledge-check">Pokušaj ponovo</button>
      <button class="btn-secondary" type="button" data-action="close-knowledge-check">Zatvori</button>
    </div>
  `;
}
