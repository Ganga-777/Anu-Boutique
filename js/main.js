// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Testimonials Slider
const testimonialsSlider = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Initialize Before/After Slider
function initComparisons() {
    const slider = document.querySelector(".img-comp-overlay");
    let clicked = 0;
    
    function slideIt(e) {
        let pos = getCursorPos(e);
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        slide(pos);
    }
    
    function getCursorPos(e) {
        let rect = slider.getBoundingClientRect();
        let x = e.pageX - rect.left;
        x = x - window.pageXOffset;
        return x;
    }
    
    // Add your slider implementation here
}

// Call the function when the page loads
window.addEventListener('load', initComparisons);

// Custom Cursor
document.body.insertAdjacentHTML('beforeend', `
    <div class="custom-cursor"></div>
    <div class="custom-cursor-dot"></div>
`);

const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
});

document.addEventListener('mousedown', () => cursor.style.transform += ' scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '')); 

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress::after');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    
    scrollProgress.style.width = `${(scrolled / scrollable) * 100}%`;
});

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Performance Optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Defer non-critical CSS
    const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    deferredStyles.forEach(style => {
        style.setAttribute('rel', 'preload');
        style.setAttribute('as', 'style');
        style.onload = function() {
            this.onload = null;
            this.rel = 'stylesheet';
        };
    });

    // Preload important images
    const preloadImages = [
        'assets/images/hero-bg.jpg',
        'assets/images/logo.png'
    ];
    preloadImages.forEach(image => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = image;
        document.head.appendChild(link);
    });
});

// Add this to your existing main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const serviceImages = document.querySelectorAll('.service-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    serviceImages.forEach(img => imageObserver.observe(img));

    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => cardObserver.observe(card));
});

// Gallery Image Loading
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.onload = () => {
                        entry.target.classList.remove('loading');
                        img.removeAttribute('data-src');
                    };
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    galleryItems.forEach(item => {
        item.classList.add('loading');
        imageObserver.observe(item);
    });

    // Optional: Add masonry layout
    const gallery = document.querySelector('.gallery-grid');
    const msnry = new Masonry(gallery, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',
        percentPosition: true
    });

    // Update layout after images load
    imagesLoaded(gallery).on('progress', () => {
        msnry.layout();
    });
});

// Enhanced Gallery Interactions
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });

    // Clone items for infinite scroll
    const scrollGallery = document.querySelector('.gallery-scroll');
    const itemsToClone = scrollGallery.children;
    [...itemsToClone].forEach(item => {
        const clone = item.cloneNode(true);
        scrollGallery.appendChild(clone);
    });

    // Pause animation on hover
    scrollGallery.addEventListener('mouseenter', () => {
        scrollGallery.style.animationPlayState = 'paused';
    });

    scrollGallery.addEventListener('mouseleave', () => {
        scrollGallery.style.animationPlayState = 'running';
    });
});

// Add this to your existing main.js file
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Clone items for infinite scroll effect
    const items = galleryGrid.children;
    const itemCount = items.length;
    
    // Clone first set of items
    for (let i = 0; i < itemCount; i++) {
        const clone = items[i].cloneNode(true);
        galleryGrid.appendChild(clone);
    }

    // Optional: Add touch scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - galleryGrid.offsetLeft;
        scrollLeft = galleryGrid.scrollLeft;
    });

    galleryGrid.addEventListener('mouseleave', () => {
        isDown = false;
    });

    galleryGrid.addEventListener('mouseup', () => {
        isDown = false;
    });

    galleryGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryGrid.offsetLeft;
        const walk = (x - startX) * 2;
        galleryGrid.scrollLeft = scrollLeft - walk;
    });
});

// Gallery Navigation
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevButton = document.querySelector('.gallery-nav-button.prev');
    const nextButton = document.querySelector('.gallery-nav-button.next');
    
    // Scroll amount for each click (width of one item plus gap)
    const scrollAmount = 430; // 400px (item width) + 30px (gap)
    
    // Next button click handler
    nextButton.addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Previous button click handler
    prevButton.addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Hide/show buttons based on scroll position
    galleryGrid.addEventListener('scroll', () => {
        // Show/hide prev button
        if (galleryGrid.scrollLeft <= 0) {
            prevButton.style.opacity = '0.5';
            prevButton.style.pointerEvents = 'none';
        } else {
            prevButton.style.opacity = '1';
            prevButton.style.pointerEvents = 'auto';
        }
        
        // Show/hide next button
        if (galleryGrid.scrollLeft >= galleryGrid.scrollWidth - galleryGrid.clientWidth - 10) {
            nextButton.style.opacity = '0.5';
            nextButton.style.pointerEvents = 'none';
        } else {
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
        }
    });

    // Optional: Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
});

// Smooth Scroll Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.desktop-nav')?.offsetHeight || 0;
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-progress').style.setProperty('--scroll-percent', `${scrollPercent}%`);
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.parallax-bg').forEach(bg => {
        const speed = bg.getAttribute('data-speed') || 5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        bg.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));