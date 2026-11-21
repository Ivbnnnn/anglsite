const practiceOrder = (() => {
  function reorder(queue, start, random, original) {
    const head = queue.slice(0, start);
    const tail = queue.slice(start);
    if (random) {
      for (let index = tail.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [tail[index], tail[other]] = [tail[other], tail[index]];
      }
      if (tail.length > 1 && tail.every((item, index) => item === queue[start + index])) {
        [tail[0], tail[1]] = [tail[1], tail[0]];
      }
    } else {
      const position = new Map(original.map((item, index) => [item, index]));
      tail.sort((a, b) => position.get(a) - position.get(b));
    }
    return head.concat(tail);
  }

  function updateButton(button, random) {
    const label = random ? 'Случайный порядок' : 'Порядок как в изучении';
    button.title = `${label}. Нажми, чтобы переключить.`;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(random));
    button.classList.toggle('is-random', random);
  }

  return { reorder, updateButton };
})();
