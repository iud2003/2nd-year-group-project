// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    }
});

// Team portal click handler
document.addEventListener('DOMContentLoaded', () => {
    const teamPortal = document.querySelector('.team-portal');
    if (teamPortal) {
        teamPortal.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof showNotification === 'function') {
                showNotification('🏈 Team Portal clicked! This would navigate to the team management system.');
            }
        });
    }
});