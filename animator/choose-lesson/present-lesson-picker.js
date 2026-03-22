export function presentLessonPicker({
  lessonPicker,
  lessons,
  currentLessonId,
  ownerLocation,
  ownerWindow
}) {
  lessonPicker.innerHTML = '';

  lessons.forEach((lesson, index) => {
    const option = ownerWindow.document.createElement('option');
    const lessonOrder = String(index + 1).padStart(2, '0');

    option.value = lesson.lessonId;
    option.textContent = `${lessonOrder} · ${lesson.lessonTitle}`;
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
