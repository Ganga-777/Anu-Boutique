// Handle mobile responsive behaviors
document.addEventListener('DOMContentLoaded', function() {
    // Navbar collapse on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Handle touch events for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.toggle('active');
        });
    });

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Handle scroll-based animations
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Reset any necessary layouts
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    });

    // Handle viewport height for mobile browsers
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);

    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
});

function adjustHeroHeight() {
    const hero = document.querySelector('.hero-section');
    const content = document.querySelector('.hero-content');
    const windowHeight = window.innerHeight;
    
    // Adjust hero height based on content
    const minHeight = Math.max(400, content.offsetHeight + 80);
    const halfViewport = windowHeight * 0.5;
    
    hero.style.height = Math.max(minHeight, halfViewport) + 'px';
} 