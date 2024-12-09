// Initialize Swiper for Featured Slider
const featuredSlider = new Swiper('.featured-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Image Loading and Animation
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        // Add loading state
        item.classList.add('loading');
        
        img.onload = () => {
            // Remove loading state when image loads
            item.classList.remove('loading');
        };
    });
});

// Lightbox Gallery
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
}); 