document.querySelectorAll('.gallery-wrapper').forEach(wrapper => {
  const scrollArea = wrapper.querySelector('.scroll-foto');
  const leftBtn = wrapper.querySelector('.scroll-left');
  const rightBtn = wrapper.querySelector('.scroll-right');
  const scrollAmount = 320;

  leftBtn.addEventListener('click', () => {
    scrollArea.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    scrollArea.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});