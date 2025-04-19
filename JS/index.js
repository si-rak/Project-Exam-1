document.addEventListener('DOMContentLoaded', function () {
  //  Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Carousel
  const slides = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  const nextBtn = document.querySelector('.carousel-next');
  const prevBtn = document.querySelector('.carousel-prev');
  const carousel = document.querySelector('.carousel');

  let currentSlide = 0;

  if (slides.length && carousel && dots.length) {
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      carousel.style.transform = `translateX(-${index * 100}%)`;
      currentSlide = index;
    }

    function animateCarousel(direction) {
      carousel.classList.remove('rotate-clockwise', 'rotate-anticlockwise');
      void carousel.offsetWidth; // reflow
      carousel.classList.add(direction);
    }

    function nextSlide() {
      animateCarousel('rotate-clockwise');
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    function prevSlide() {
      animateCarousel('rotate-anticlockwise');
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    showSlide(0);
  }

  //  Blog Feed
  const feedContainer = document.getElementById('feed-posts');

  if (feedContainer) {
    async function fetchFeedPosts() {
      try {
        const response = await fetch(
          'https://v2.api.noroff.dev/blog/posts/sirakfinal'
        );
        const data = await response.json();
        const posts = data.data;

        feedContainer.innerHTML = '';

        posts.slice(0, 12).forEach((post) => {
          feedContainer.innerHTML += `
            <div class="grid-item">
              <img src="${
                post.media?.url || 'https://placehold.co/300x200'
              }" alt="${post.media?.alt || post.title}" />
              <h3>${post.title}</h3>
              <p>${post.body?.slice(0, 100) || 'No content available.'}...</p>
              <a href="/post/index.html?id=${post.id}">Read More</a>
            </div>
          `;
        });
      } catch (error) {
        console.error('❌ Failed to fetch feed posts:', error);
        feedContainer.innerHTML = '<p>Error loading blog posts.</p>';
      }
    }

    fetchFeedPosts();
  }
});
