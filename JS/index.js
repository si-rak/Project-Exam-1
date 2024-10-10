// JavaScript for hamburger menu toggle
// Some code borrowed from Yuotube channel, https://youtu.be/flItyHiDm7E?si=RIXGmFdVbsnwSZzh
document.getElementById('hamburger').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active'); 
});

// Some code borrowed from youtube channel, https://youtu.be/qOO6lVMhmGc?si=gB4ec4Mt8bP4vpoC 
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');

// Show Slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    document.querySelector('.carousel').style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

// Next Slide
function nextSlide() {
    let nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
}

// Previous Slide
function prevSlide() {
    let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

// Set up Event Listeners for navigation
document.querySelector('.carousel-next').addEventListener('click', nextSlide);
document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

// Dots Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto carousel rotation every 5 seconds
setInterval(nextSlide, 5000);

