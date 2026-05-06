const portfolioCarousel = document.querySelector('[data-portfolio-carousel]');

if (portfolioCarousel) {
  const track = portfolioCarousel.querySelector('[data-portfolio-track]');
  const prevButton = portfolioCarousel.querySelector('[data-portfolio-prev]');
  const nextButton = portfolioCarousel.querySelector('[data-portfolio-next]');
  const currentPageElement = document.querySelector('[data-portfolio-current]');
  const progressIndicator = document.querySelector('[data-portfolio-progress]');

  const cardsPerPage = 3;
  const cards = Array.from(track.children);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  let currentPage = 0;

  const formatPageNumber = (pageIndex) => String(pageIndex + 1).padStart(2, '0');

  const updateCarousel = () => {
    const viewportWidth = portfolioCarousel.querySelector('.portfolio__viewport').offsetWidth;
    const offset = currentPage * viewportWidth;

    track.style.transform = `translateX(-${offset}px)`;

    currentPageElement.textContent = formatPageNumber(currentPage);

    progressIndicator.style.transform = `translateX(${currentPage * 100}%)`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
  };

  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);

  updateCarousel();
}

const partnersCarousel = document.querySelector('[data-partners-carousel]');

if (partnersCarousel) {
  const track = partnersCarousel.querySelector('[data-partners-track]');
  const prevButton = partnersCarousel.querySelector('[data-partners-prev]');
  const nextButton = partnersCarousel.querySelector('[data-partners-next]');
  const currentPageElement = document.querySelector('[data-partners-current]');
  const progressIndicator = document.querySelector('[data-partners-progress]');

  const slides = Array.from(track.children);
  const totalPages = slides.length;

  let currentPage = 0;

  const formatPageNumber = (pageIndex) => String(pageIndex + 1).padStart(2, '0');

  const updatePartnersCarousel = () => {
    const viewportWidth = partnersCarousel.querySelector('.partners__viewport').offsetWidth;
    const offset = currentPage * viewportWidth;

    track.style.transform = `translateX(-${offset}px)`;

    currentPageElement.textContent = formatPageNumber(currentPage);

    progressIndicator.style.transform = `translateX(${currentPage * 100}%)`;
    progressIndicator.style.width = `${100 / totalPages}%`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
  };

  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage -= 1;
      updatePartnersCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updatePartnersCarousel();
    }
  });

  window.addEventListener('resize', updatePartnersCarousel);

  updatePartnersCarousel();
}