// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for scroll animations
document.querySelectorAll('.feature-card, .news-card, .event-card, .team-member, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Events scroll functionality
const eventsScroll = document.querySelector('.events-scroll');
let scrollInterval;

// Auto-scroll events
const autoScrollEvents = () => {
    scrollInterval = setInterval(() => {
        if (eventsScroll.scrollLeft >= eventsScroll.scrollWidth - eventsScroll.clientWidth) {
            eventsScroll.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            eventsScroll.scrollBy({ left: 270, behavior: 'smooth' });
        }
    }, 3000);
};

// Initialize auto-scroll
autoScrollEvents();

// Pause auto-scroll on hover
eventsScroll.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
});

eventsScroll.addEventListener('mouseleave', () => {
    autoScrollEvents();
});

// Dynamic card hover effects
document.querySelectorAll('.news-card, .event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    });
});

// Add click functionality to news cards
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', function() {
        const newsTitle = this.querySelector('h3').textContent;
        showNotification(`📰 "${newsTitle}" clicked! This would normally navigate to the full article.`);
    });
});

// Add click functionality to event cards
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
        const eventTitle = this.querySelector('h4').textContent;
        const eventDate = this.querySelector('.event-date').textContent;
        showNotification(`📅 Event "${eventTitle}" on ${eventDate} clicked! This would show event details.`);
    });
});

// Team member interactions
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', function() {
        const name = this.querySelector('.team-name').textContent;
        const role = this.querySelector('.team-role').textContent;
        showNotification(`👤 ${name} (${role}) profile clicked! This would show detailed information.`);
    });
});

// Custom notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #663399, #9966cc);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Add focus indicators for better accessibility
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('news-card') || 
            focusedElement.classList.contains('event-card') || 
            focusedElement.classList.contains('team-member')) {
            focusedElement.style.outline = '3px solid #663399';
        }
    }
});

// Remove focus outline when clicking
document.addEventListener('click', () => {
    document.querySelectorAll('.news-card, .event-card, .team-member').forEach(el => {
        el.style.outline = 'none';
    });
});

// Scroll to top