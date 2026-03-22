import { createKnowledgeCheckProgress } from './create-knowledge-check-progress.js';
import { showKnowledgeCheckQuestion } from './show-knowledge-check-question.js';
import { showKnowledgeCheckScore } from './show-knowledge-check-score.js';

export function presentKnowledgeCheck({ lessonParts, knowledgeCheckQuestions }) {
  let knowledgeCheckProgress = createKnowledgeCheckProgress();
  let advanceTimer = null;

  lessonParts.knowledgeCheckModal.addEventListener('click', event => {
    if (event.target === lessonParts.knowledgeCheckModal) {
      closeKnowledgeCheck();
    }
  });

  lessonParts.knowledgeCheckContent.addEventListener('click', event => {
    const actionButton = event.target.closest('[data-action]');

    if (actionButton) {
      if (actionButton.dataset.action === 'restart-knowledge-check') {
        restartKnowledgeCheck();
      }

      if (actionButton.dataset.action === 'close-knowledge-check') {
        closeKnowledgeCheck();
      }

      return;
    }

    const optionButton = event.target.closest('[data-answer-index]');

    if (optionButton) {
      gradeAnswer(parseInt(optionButton.dataset.answerIndex, 10));
    }
  });

  function clearAdvanceTimer() {
    if (!advanceTimer) {
      return;
    }

    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }

  function showCurrentKnowledgeCheckStep() {
    if (knowledgeCheckProgress.currentQuestionNumber >= knowledgeCheckQuestions.length) {
      showKnowledgeCheckScore({
        lessonParts,
        correctAnswerCount: knowledgeCheckProgress.correctAnswerCount,
        totalQuestions: knowledgeCheckQuestions.length
      });
      return;
    }

    showKnowledgeCheckQuestion({
      lessonParts,
      question: knowledgeCheckQuestions[knowledgeCheckProgress.currentQuestionNumber],
      currentQuestionNumber: knowledgeCheckProgress.currentQuestionNumber,
      totalQuestions: knowledgeCheckQuestions.length
    });
  }

  function gradeAnswer(answerIndex) {
    const activeQuestion = knowledgeCheckQuestions[knowledgeCheckProgress.currentQuestionNumber];
    const optionButtons = lessonParts.knowledgeCheckContent.querySelectorAll('[data-answer-index]');

    optionButtons.forEach((optionButton, index) => {
      optionButton.disabled = true;

      if (index === activeQuestion.correct) {
        optionButton.classList.add('correct');
      }

      if (index === answerIndex && answerIndex !== activeQuestion.correct) {
        optionButton.classList.add('incorrect');
      }
    });

    if (answerIndex === activeQuestion.correct) {
      knowledgeCheckProgress.correctAnswerCount += 1;
    }

    clearAdvanceTimer();
    advanceTimer = window.setTimeout(() => {
      knowledgeCheckProgress.currentQuestionNumber += 1;
      showCurrentKnowledgeCheckStep();
    }, 1500);
  }

  function openKnowledgeCheck() {
    knowledgeCheckProgress = createKnowledgeCheckProgress();
    lessonParts.knowledgeCheckModal.classList.add('active');
    showCurrentKnowledgeCheckStep();
  }

  function closeKnowledgeCheck() {
    clearAdvanceTimer();
    lessonParts.knowledgeCheckModal.classList.remove('active');
  }

  function restartKnowledgeCheck() {
    clearAdvanceTimer();
    knowledgeCheckProgress = createKnowledgeCheckProgress();
    showCurrentKnowledgeCheckStep();
  }

  function isKnowledgeCheckOpen() {
    return lessonParts.knowledgeCheckModal.classList.contains('active');
  }

  return {
    closeKnowledgeCheck,
    isKnowledgeCheckOpen,
    openKnowledgeCheck
  };
}
