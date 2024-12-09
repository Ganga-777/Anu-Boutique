function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
    
    // Toggle body scroll
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close menu when clicking a link
document.querySelectorAll('.menu-items a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
        document.body.style.overflow = '';
    });
}); 

function adjustHeroHeight() {
    const hero = document.querySelector('.hero-section');
    const content = document.querySelector('.hero-content');
    const windowHeight = window.innerHeight;
    const contentHeight = content.offsetHeight;
    
    // Calculate optimal height (50% of viewport or enough to fit content)
    const optimalHeight = Math.max(windowHeight * 0.5, contentHeight + 80);
    
    // Set minimum height to prevent squishing
    const minHeight = Math.min(400, optimalHeight);
    
    hero.style.height = `${minHeight}px`;
} 