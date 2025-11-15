
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.opacity = '1';
            slide.style.zIndex = '1';
        } else {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

showSlide(currentSlide);

setInterval(nextSlide, 4000);