$(document).ready(function () {
    $('.slick-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    // Функція для переключення на попередній слайд
    $('.prev-btn').click(function () {
        $('.slick-slider').slick('slickPrev');
    });

    // Функція для переключення на наступний слайд
    $('.next-btn').click(function () {
        $('.slick-slider').slick('slickNext');
    });
});

//Modal
const modal = document.querySelector('.modal__nav');
const closeModal = document.querySelector('.close-modal');
const openModal = document.querySelector('.header__burger');

openModal.addEventListener('click', () => {
    modal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Функціонал роботи з додаванням або прибиранням hidden
const allProduct = document.querySelector('.our_product-container-button');
const container = document.querySelector('.our_product-hidden');
const allProductSpan = document.querySelector('.all-product-span');

// Функція для зміни стану блоку та тексту кнопки
function toggleHiddenClass() {
    container.classList.toggle('hidden');

    // Зберігаємо стан блоку в локальному сховищі
    if (container.classList.contains('hidden')) {
        localStorage.setItem('isHidden', 'true');
    } else {
        localStorage.removeItem('isHidden');
    }

    // Змінюємо текст кнопки в залежності від стану блоку
    if (container.classList.contains('hidden')) {
        allProductSpan.textContent = 'Все продукты';
    } else {
        allProductSpan.textContent = 'Убрать';
    }
}

// Перевіряємо, чи є значення для ключа "isHidden" в локальному сховищі
const isHiddenInStorage = localStorage.getItem('isHidden');

// Якщо значення в локальному сховищі є, то застосовуємо його до класу "hidden"
if (isHiddenInStorage) {
    container.classList.add('hidden');
    allProductSpan.textContent = 'Все продукты';
} else {
    container.classList.remove('hidden');
    allProductSpan.textContent = 'Убрать';
}

// Додаємо обробник події на кнопку для зміни стану блоку та тексту кнопки
allProduct.addEventListener('click', toggleHiddenClass);


function smoothScroll(target) {
    const element = document.querySelector(target);
    const headerOffset = 100; // Розмір фіксованого хедера (якщо є)
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Обробник події click на всі якорі
const anchors = document.querySelectorAll('a[href^="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Забороняємо дійсний перехід по якорю
        const target = this.getAttribute('href'); // Отримуємо властивість href якоря
        smoothScroll(target); // Викликаємо функцію плавного скролла
    });
}

//Зберегання каунту слайдеру у локал сторедж

const slides = document.querySelectorAll('.slide');
const slideNumberDisplay = document.getElementById('current-slide-number');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Первый слайд отображается при загрузке страницы, устанавливаем номер 1
let currentSlideNumber = parseInt(localStorage.getItem('currentSlideNumber'), 10) || 1;
slideNumberDisplay.textContent = currentSlideNumber;

function saveCurrentSlideNumber() {
    // Сохраняем текущий номер слайда в локальное хранилище
    localStorage.setItem('currentSlideNumber', currentSlideNumber.toString());
}

function setActiveSlide(slideNumber) {
    slides.forEach(slide => slide.classList.remove('active'));
    const activeSlide = document.querySelector(`[data-slide-number="${slideNumber}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    currentSlideNumber = slideNumber;
    slideNumberDisplay.textContent = currentSlideNumber;
    saveCurrentSlideNumber();
}

function goToPrevSlide() {
    currentSlideNumber = (currentSlideNumber - 1) <= 0 ? slides.length : currentSlideNumber - 1;
    setActiveSlide(currentSlideNumber);
}

function goToNextSlide() {
    currentSlideNumber = (currentSlideNumber + 1) > slides.length ? 1 : currentSlideNumber + 1;
    setActiveSlide(currentSlideNumber);
}

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        const slideNumber = slide.dataset.slideNumber;
        setActiveSlide(slideNumber);
    });
});

prevBtn.addEventListener('click', goToPrevSlide);
nextBtn.addEventListener('click', goToNextSlide);

//Робота з формою
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const requiredInputs = contactForm.querySelectorAll('[required]');
    let isFormValid = true;

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isFormValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // Якщо форма валідна, ви можете відправити дані на сервер або здійснити інші дії
    if (isFormValid) {
        // Додайте код для відправки форми на сервер або обробки даних тут
        console.log('Форма валідна! Відправка на сервер...');

        // Очищаємо поля після успішної відправки
        requiredInputs.forEach(input => {
            input.value = '';
        });
    }
});

const phoneInput = document.getElementById('phoneInput');
const phoneNumberPattern = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

phoneInput.addEventListener('input', function() {
    const inputValue = phoneInput.value.replace(/[^\d\-+]/g, '');
    phoneInput.value = inputValue;
});

phoneInput.addEventListener('blur', function() {
    if (!phoneNumberPattern.test(phoneInput.value)) {
        phoneInput.classList.add('invalid');
    } else {
        phoneInput.classList.remove('invalid');
    }
});

const aboutCompanyBtn = document.querySelector('.about-company-btn');

aboutCompanyBtn.addEventListener('click', function() {
    window.location.href = 'company.html';
});


