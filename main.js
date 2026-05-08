/* ================================
   Mobile menu
================================ */

const menuOpenButton = document.querySelector('[data-menu-open]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

if (menuOpenButton && mobileMenu) {
  const openMenu = () => {
    document.body.classList.add('is-menu-open');
    menuOpenButton.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    document.body.classList.remove('is-menu-open');
    menuOpenButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  menuOpenButton.addEventListener('click', openMenu);

  menuCloseButtons.forEach((button) => {
    button.addEventListener('click', closeMenu);
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('is-menu-open')) {
      closeMenu();
    }
  });
}


/* ================================
   Portfolio carousel
================================ */

const portfolioCarousel = document.querySelector('[data-portfolio-carousel]');

if (portfolioCarousel) {
  const track = portfolioCarousel.querySelector('[data-portfolio-track]');
  const prevButton = portfolioCarousel.querySelector('[data-portfolio-prev]');
  const nextButton = portfolioCarousel.querySelector('[data-portfolio-next]');
  const currentPageElement = document.querySelector('[data-portfolio-current]');
  const progressIndicator = document.querySelector('[data-portfolio-progress]');
  const tabletMediaQuery = window.matchMedia('(max-width: 1024px)');

  const cardsPerPage = 3;
  const cards = Array.from(track.children);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  let currentPage = 0;

  const formatPageNumber = (pageIndex) => String(pageIndex + 1).padStart(2, '0');

  const updateCarousel = () => {
    if (tabletMediaQuery.matches) {
      track.style.transform = 'translateX(0)';
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    const viewportWidth = portfolioCarousel.querySelector('.portfolio__viewport').offsetWidth;
    const offset = currentPage * viewportWidth;

    track.style.transform = `translateX(-${offset}px)`;

    currentPageElement.textContent = formatPageNumber(currentPage);

    progressIndicator.style.width = `${100 / totalPages}%`;
    progressIndicator.style.transform = `translateX(${currentPage * 100}%)`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
  };

  prevButton.addEventListener('click', () => {
    if (tabletMediaQuery.matches) {
      return;
    }

    if (currentPage > 0) {
      currentPage -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (tabletMediaQuery.matches) {
      return;
    }

    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);
  tabletMediaQuery.addEventListener('change', updateCarousel);

  updateCarousel();
}


/* ================================
   Partners carousel
================================ */

const partnersCarousel = document.querySelector('[data-partners-carousel]');

if (partnersCarousel) {
  const track = partnersCarousel.querySelector('[data-partners-track]');
  const prevButton = partnersCarousel.querySelector('[data-partners-prev]');
  const nextButton = partnersCarousel.querySelector('[data-partners-next]');
  const currentPageElement = document.querySelector('[data-partners-current]');
  const progressIndicator = document.querySelector('[data-partners-progress]');
  const tabletMediaQuery = window.matchMedia('(max-width: 1024px)');

  const slides = Array.from(track.children);
  const totalPages = slides.length;

  let currentPage = 0;

  const formatPageNumber = (pageIndex) => String(pageIndex + 1).padStart(2, '0');

  const updatePartnersCarousel = () => {
    if (tabletMediaQuery.matches) {
      track.style.transform = 'translateX(0)';
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    const viewportWidth = partnersCarousel.querySelector('.partners__viewport').offsetWidth;
    const offset = currentPage * viewportWidth;

    track.style.transform = `translateX(-${offset}px)`;

    currentPageElement.textContent = formatPageNumber(currentPage);

    progressIndicator.style.width = `${100 / totalPages}%`;
    progressIndicator.style.transform = `translateX(${currentPage * 100}%)`;

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
  };

  prevButton.addEventListener('click', () => {
    if (tabletMediaQuery.matches) {
      return;
    }

    if (currentPage > 0) {
      currentPage -= 1;
      updatePartnersCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (tabletMediaQuery.matches) {
      return;
    }

    if (currentPage < totalPages - 1) {
      currentPage += 1;
      updatePartnersCarousel();
    }
  });

  window.addEventListener('resize', updatePartnersCarousel);
  tabletMediaQuery.addEventListener('change', updatePartnersCarousel);

  updatePartnersCarousel();
}


/* ================================
   FAQ accordion
================================ */

const faqList = document.querySelector('[data-faq-list]');

if (faqList) {
  const faqButtons = Array.from(faqList.querySelectorAll('[data-faq-button]'));

  const downIconPath =
    'M14.7584 5.25853L13.575 4.0752L8.09171 9.55853L2.60838 4.0752L1.42505 5.25853L8.09171 11.9252L14.7584 5.25853Z';

  const upIconPath =
    'M14.7584 10.7415L13.575 11.9248L8.09171 6.44147L2.60838 11.9248L1.42505 10.7415L8.09171 4.07481L14.7584 10.7415Z';

  const closeFaqItem = (button) => {
    const item = button.closest('.faq__item');
    const answerId = button.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    const iconPath = button.querySelector('.faq__icon path');

    button.setAttribute('aria-expanded', 'false');
    item.classList.remove('is-open');
    answer.hidden = true;
    iconPath.setAttribute('d', downIconPath);
  };

  const openFaqItem = (button) => {
    const item = button.closest('.faq__item');
    const answerId = button.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    const iconPath = button.querySelector('.faq__icon path');

    button.setAttribute('aria-expanded', 'true');
    item.classList.add('is-open');
    answer.hidden = false;
    iconPath.setAttribute('d', upIconPath);
  };

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      faqButtons.forEach(closeFaqItem);

      if (!isExpanded) {
        openFaqItem(button);
      }
    });
  });
}


/* ================================
   Phone forms validation
================================ */

const phoneForms = document.querySelectorAll('[data-phone-form]');

if (phoneForms.length && window.libphonenumber) {
  const formatPhoneNumber = (value) => {
    return new libphonenumber.AsYouType().input(value);
  };

  const validatePhone = (input) => {
    const value = input.value.trim();

    if (!value) {
      return 'Please enter your phone number.';
    }

    if (!value.startsWith('+')) {
      return 'Please start the phone number with a country code, for example +44.';
    }

    const phoneNumber = libphonenumber.parsePhoneNumberFromString(value);

    if (!phoneNumber) {
      return 'Please enter a valid phone number.';
    }

    if (!phoneNumber.countryCallingCode) {
      return 'Please enter a valid country code, for example +44 for the United Kingdom.';
    }

    if (!phoneNumber.isPossible()) {
      return 'Please check the length of your phone number.';
    }

    if (!phoneNumber.isValid()) {
      return 'Please enter a valid phone number, including the correct country code.';
    }

    return '';
  };

  const showPhoneError = (input, error, errorText, message) => {
    input.classList.add('is-error');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', error.id);

    errorText.textContent = message;
    error.hidden = false;
  };

  const hidePhoneError = (input, error, errorText) => {
    input.classList.remove('is-error');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');

    errorText.textContent = '';
    error.hidden = true;
  };

  phoneForms.forEach((form) => {
    const phoneInput = form.querySelector('[data-phone-input]');
    const phoneError = form.querySelector('[data-phone-error]');
    const phoneErrorText = form.querySelector('[data-phone-error-text]');

    phoneInput.addEventListener('input', () => {
      phoneInput.value = formatPhoneNumber(phoneInput.value);

      if (phoneInput.classList.contains('is-error')) {
        const errorMessage = validatePhone(phoneInput);

        if (errorMessage) {
          showPhoneError(phoneInput, phoneError, phoneErrorText, errorMessage);
        } else {
          hidePhoneError(phoneInput, phoneError, phoneErrorText);
        }
      }
    });

    phoneInput.addEventListener('blur', () => {
      const errorMessage = validatePhone(phoneInput);

      if (phoneInput.value.trim() && errorMessage) {
        showPhoneError(phoneInput, phoneError, phoneErrorText, errorMessage);
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const errorMessage = validatePhone(phoneInput);

      if (errorMessage) {
        showPhoneError(phoneInput, phoneError, phoneErrorText, errorMessage);
        phoneInput.focus();
        return;
      }

      const phoneNumber = libphonenumber.parsePhoneNumberFromString(phoneInput.value);

      console.log('Phone number is valid:', phoneNumber.number);

      hidePhoneError(phoneInput, phoneError, phoneErrorText);
      form.reset();
    });
  });
}

