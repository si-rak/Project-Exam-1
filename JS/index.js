// JavaScript for hamburger menu toggle
// Some code borrowed from Yuotube channel, https://youtu.be/flItyHiDm7E?si=RIXGmFdVbsnwSZzh
document.getElementById('hamburger').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active'); 
});

// Some code borrowed from youtube channel, https://youtu.be/qOO6lVMhmGc?si=gB4ec4Mt8bP4vpoC 
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });
    dots.forEach((dot) => {
        dot.classList.remove('active');
    });
    slides[index].style.display = 'block';
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length; 
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; 
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1; 
    showSlide(currentSlideIndex);
}
showSlide(currentSlideIndex);

