function initsliders(params) {
  $('.section1__slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $('.active__tab__slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: true,
          centerPadding: '10px',
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $('.section3__slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}
window.addEventListener('DOMContentLoaded', () => {
  initsliders();
});

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal-register.active');
  modals.forEach((modal) => {
    closeModal(modal);
  });
});
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal-login.active');
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-register');
    closeModal(modal);
  });
});
closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-login');
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

const filterItems = document.querySelectorAll('.filter__item');
const clickTraget = document.querySelector('.section2__filters__wrapper');
const sliders = document.querySelectorAll('.section2__slider');
clickTraget.addEventListener('click', tabHandler);

function tabHandler(e) {
  const targetfilter = e.target.dataset.sort;
  if (e.target.tagName === 'SPAN') {
    if (e.target.classList.contains('filter_active')) {
      false;
    } else {
      $('.active__tab__slider').slick('unslick');
      filterItems.forEach((elem) => {
        elem.classList.remove('filter_active');
      });
      e.target.classList.add('filter_active');
    }
    sliders.forEach((elem) => {
      if (elem.dataset.sort !== targetfilter) {
        elem.classList.remove('active__tab__slider');
      } else {
        elem.classList.add('active__tab__slider');
      }
    });
    $('.active__tab__slider').slick({
      dots: true,
      infinite: false,
      arrows: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            dots: false,
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  } else {
    false;
  }
}

const inpSearch = document.getElementById('search');
inpSearch.addEventListener('focus', () => {
  document.querySelector('.header__loop').style.color = 'white';
});
inpSearch.addEventListener('blur', () => {
  document.querySelector('.header__loop').style.color = '#867594';
});
