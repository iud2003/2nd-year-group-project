function loadComponent(elementId, componentPath) {
    fetch(`${componentPath}/index.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            // After HTML is injected, load CSS and JS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${componentPath}/styles.css`;
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = `${componentPath}/script.js`;
            script.onload = () => {
                // Initialize header after JS loads
                if (window.initHeader) window.initHeader();
            };
            document.body.appendChild(script);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '../header'); // dynamically load header
});


// Sample data for events
const eventsData = [
    {
        id: 1,
        type: 'training',
        title: 'Fitness Training',
        subtitle: 'Training Session',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 2,
        type: 'training',
        title: 'Fitness Training',
        subtitle: 'Training Session',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 3,
        type: 'match',
        title: 'UOC vs MORA',
        subtitle: 'Match',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 4,
        type: 'training',
        title: 'Fitness Training',
        subtitle: 'Training Session',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 5,
        type: 'training',
        title: 'Fitness Training',
        subtitle: 'Training Session',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 6,
        type: 'match',
        title: 'UOC vs MORA',
        subtitle: 'Match',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 7,
        type: 'training',
        title: 'Fitness Training',
        subtitle: 'Training Session',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 8,
        type: 'training',
        title: 'Fitness Training',
        subtitle: 'Training Session',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    },
    {
        id: 9,
        type: 'match',
        title: 'UOC vs MORA',
        subtitle: 'Match',
        date: 'September 01 2025',
        time: '8.00 am - 12.00 pm'
    }
];

// State management
let currentFilter = 'all';
let currentPage = 1;
const eventsPerPage = 9;

// DOM elements
const eventsGrid = document.getElementById('events-grid');
const tabButtons = document.querySelectorAll('.tab-btn');
const paginationButtons = document.querySelectorAll('.pagination-btn[data-page]');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderEvents();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Filter tabs
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            setActiveFilter(filter);
        });
    });

    // Pagination
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.dataset.page);
            setCurrentPage(page);
        });
    });

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', function() {
        const filteredEvents = getFilteredEvents();
        const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    });
}

// Filter functions
function setActiveFilter(filter) {
    currentFilter = filter;
    currentPage = 1;

    // Update active tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    renderEvents();
    updatePagination();
}

function getFilteredEvents() {
    if (currentFilter === 'all') {
        return eventsData;
    }
    return eventsData.filter(event => {
        if (currentFilter === 'matches') return event.type === 'match';
        if (currentFilter === 'training') return event.type === 'training';
        return true;
    });
}

// Pagination functions
function setCurrentPage(page) {
    currentPage = page;

    // Update active pagination button
    paginationButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    renderEvents();
    updatePagination();
}

function updatePagination() {
    const filteredEvents = getFilteredEvents();
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    // Update button states
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Show/hide pagination buttons based on total pages
    paginationButtons.forEach(btn => {
        const page = parseInt(btn.dataset.page);
        btn.style.display = page <= totalPages ? 'block' : 'none';
    });
}

// Render functions
function renderEvents() {
    const filteredEvents = getFilteredEvents();
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const eventsToShow = filteredEvents.slice(startIndex, endIndex);

    eventsGrid.innerHTML = '';

    eventsToShow.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });

    // Add animation
    const cards = eventsGrid.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const iconClass = event.type === 'training' ? 'training-icon' : 'match-icon';
    const iconSymbol = event.type === 'training' ? '💪' : '🏆';
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-icon ${iconClass}">
                ${iconSymbol}
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <span class="event-type">${event.subtitle}</span>
            </div>
        </div>
        <div class="event-info">
            <div class="info-row">
                <svg class="info-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <span>${event.date}</span>
            </div>
            <div class="info-row">
                <svg class="info-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="m12.5 7-1 0 0 6 5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>${event.time}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Add hover effects and interactions
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.matches('.tab-btn, .pagination-btn')) {
        createRippleEffect(e.target, e);
    }
});

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation if not already added
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize pagination state
updatePagination();