// Values section interactions
document.addEventListener('DOMContentLoaded', () => {
    const valueItems = document.querySelectorAll('.value-item');
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);

    // Setup animations for each value item
    valueItems.forEach((item, index) => {
        // Set initial animation state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.8)';
        item.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(item);

        // Click interaction
        item.addEventListener('click', () => {
            const value = item.textContent.trim();
            if (typeof showNotification === 'function') {
                showNotification(`💪 "${value}" - A core value that drives our team to excellence!`);
            }
        });
    });
});