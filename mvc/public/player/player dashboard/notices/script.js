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


// Sample notices data
const noticesData = [
    {
        id: 1,
        title: "Notice",
        author: "Team Captain",
        date: "Jan 13, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: true,
        category: "team-captain"
    },
    {
        id: 2,
        title: "Notice",
        author: "Coach Martinez",
        date: "Jan 14, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: true,
        category: "coach"
    },
    {
        id: 3,
        title: "Notice",
        author: "Coach Martinez",
        date: "Jan 14, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: false,
        category: "coach"
    },
    {
        id: 4,
        title: "Notice",
        author: "Coach Martinez",
        date: "Jan 14, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: false,
        category: "coach"
    },
    {
        id: 5,
        title: "Notice",
        author: "Team Captain",
        date: "Jan 13, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: false,
        category: "team-captain"
    },
    {
        id: 6,
        title: "Notice",
        author: "Coach Martinez",
        date: "Jan 14, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: false,
        category: "coach"
    },
    {
        id: 7,
        title: "Notice",
        author: "Team Captain",
        date: "Jan 13, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: false,
        category: "team-captain"
    },
    {
        id: 8,
        title: "Notice",
        author: "Coach Martinez",
        date: "Jan 14, 2024",
        content: "Tomorrow's (25th August 2025) training session has been cancelled due to heavy rain and unsafe field conditions.",
        isNew: false,
        category: "coach"
    }
];

// Global variables
let filteredNotices = [...noticesData];
let currentFilter = 'all';

// DOM elements
const noticesGrid = document.getElementById('noticesGrid');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderNotices();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter functionality
    filterSelect.addEventListener('change', handleFilter);
    
    // Navigation interactions
    setupNavigation();
}

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    filteredNotices = noticesData.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm) ||
        notice.author.toLowerCase().includes(searchTerm) ||
        notice.content.toLowerCase().includes(searchTerm) ||
        notice.date.toLowerCase().includes(searchTerm)
    );
    
    // Apply current filter to search results
    if (currentFilter !== 'all') {
        filteredNotices = filteredNotices.filter(notice => {
            switch(currentFilter) {
                case 'new':
                    return notice.isNew;
                case 'team-captain':
                    return notice.category === 'team-captain';
                case 'coach':
                    return notice.category === 'coach';
                default:
                    return true;
            }
        });
    }
    
    renderNotices();
}

// Handle filter functionality
function handleFilter(event) {
    currentFilter = event.target.value;
    
    // Start with all notices or current search results
    const searchTerm = searchInput.value.toLowerCase().trim();
    let baseNotices = noticesData;
    
    if (searchTerm) {
        baseNotices = noticesData.filter(notice => 
            notice.title.toLowerCase().includes(searchTerm) ||
            notice.author.toLowerCase().includes(searchTerm) ||
            notice.content.toLowerCase().includes(searchTerm) ||
            notice.date.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply filter
    if (currentFilter === 'all') {
        filteredNotices = [...baseNotices];
    } else {
        filteredNotices = baseNotices.filter(notice => {
            switch(currentFilter) {
                case 'new':
                    return notice.isNew;
                case 'team-captain':
                    return notice.category === 'team-captain';
                case 'coach':
                    return notice.category === 'coach';
                default:
                    return true;
            }
        });
    }
    
    renderNotices();
}

// Render notices to the grid
function renderNotices() {
    noticesGrid.innerHTML = '';
    
    if (filteredNotices.length === 0) {
        noticesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                <h3>No notices found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    filteredNotices.forEach((notice, index) => {
        const noticeCard = createNoticeCard(notice);
        noticesGrid.appendChild(noticeCard);
        
        // Add animation delay for staggered effect
        setTimeout(() => {
            noticeCard.classList.add('new-animation');
        }, index * 100);
    });
}

// Create individual notice card
function createNoticeCard(notice) {
    const card = document.createElement('div');
    card.className = 'notice-card';
    card.style.opacity = '0';
    
    card.innerHTML = `
        <div class="notice-header">
            <h3 class="notice-title">${notice.title}</h3>
            ${notice.isNew ? '<span class="notice-badge">NEW</span>' : ''}
        </div>
        <div class="notice-meta">
            <div class="notice-author">${notice.author}</div>
            <div class="notice-date">${notice.date}</div>
        </div>
        <div class="notice-content">${notice.content}</div>
    `;
    
    // Add click interaction
    card.addEventListener('click', () => {
        showNoticeDetails(notice);
    });
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    return card;
}

// Show notice details (could open modal or navigate to detail page)
function showNoticeDetails(notice) {
    // For demo purposes, just show an alert
    // In a real app, this might open a modal or navigate to a detail page
    alert(`Notice Details:\n\nFrom: ${notice.author}\nDate: ${notice.date}\n\n${notice.content}`);
}

// Setup navigation interactions
function setupNavigation() {
    // Handle navigation clicks
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // In a real app, you might navigate to different pages here
            console.log(`Navigating to: ${item.textContent}`);
        });
    });
    
    // Handle notification bell click
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', () => {
        // Show notification dropdown or navigate to notifications page
        alert('Notifications clicked! 🔔');
    });
    
    // Handle profile avatar click
    const profileAvatar = document.querySelector('.profile-avatar');
    profileAvatar.addEventListener('click', () => {
        // Show profile dropdown or navigate to profile page
        alert('Profile clicked! 👤');
    });
}

// Utility function to add new notice (for future functionality)
function addNewNotice(noticeData) {
    const newNotice = {
        id: noticesData.length + 1,
        ...noticeData,
        isNew: true
    };
    
    noticesData.unshift(newNotice);
    filteredNotices = [...noticesData];
    renderNotices();
    
    // Show success message
    showNotification('New notice added successfully!', 'success');
}

// Show notification toast (utility function)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#6b46c1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Example of how to use the addNewNotice function
// addNewNotice({
//     title: "New Training Schedule",
//     author: "Team Captain",
//     date: "Jan 15, 2024",
//     content: "Updated training schedule for next week is now available.",
//     category: "team-captain"
// });