export function presentLessonPicker({
  lessonPicker,
  lessons,
  currentLessonId,
  ownerLocation,
  ownerWindow
}) {
  lessonPicker.innerHTML = '';

  lessons.forEach(lesson => {
    const option = ownerWindow.document.createElement('option');

    option.value = lesson.lessonId;
    option.textContent = lesson.lessonTitle;
    lessonPicker.append(option);
  });

  lessonPicker.value = currentLessonId;
  lessonPicker.disabled = lessons.length < 2;

  lessonPicker.addEventListener('change', () => {
    const nextLocation = new URL(ownerLocation.href);
    nextLocation.searchParams.set('lesson', lessonPicker.value);
    ownerWindow.location.assign(nextLocation.toString());
  });
}
