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


// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    updateDateTime();
    
    // Update time every minute
    setInterval(updateDateTime, 60000);
    
    // Add click animations to action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 100);
        });
    });
});

function updateDateTime() {
    const now = new Date();
    const dateElement = document.querySelector('.welcome-date .date');
    const timeElement = document.querySelector('.welcome-date .time');
    
    if (dateElement && timeElement) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
        
        dateElement.textContent = formattedDate;
        timeElement.textContent = formattedTime;
    }
}

function navigateToTeams() {
    // In a real application, you would use a router
    // For now, we'll just show an alert
    console.log('Navigating to Teams page...');
    // window.location.href = 'teams.html';
}

function navigateToTests() {
    console.log('Navigating to Test Results page...');
    // window.location.href = 'tests.html';
}

// Add smooth scroll behavior for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Notification functionality
document.querySelector('.notification-icon').addEventListener('click', function() {
    // Toggle notification panel or show notifications
    console.log('Show notifications');
});

// Profile avatar functionality
document.querySelector('.profile-avatar').addEventListener('click', function() {
    // Toggle profile menu
    console.log('Show profile menu');
});

// Add button functionalities
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.closest('.notice-board, .upcoming-matches');
        if (section.classList.contains('notice-board')) {
            console.log('Add new notice');
        } else {
            console.log('Add new match/event');
        }
    });
});

// Edit button functionalities
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Edit item');
    });
});

// Inventory item click handlers
document.querySelectorAll('.inventory-item').forEach(item => {
    item.addEventListener('click', function() {
        const itemName = this.querySelector('.item-name').textContent;
        console.log(`View details for: ${itemName}`);
    });
});

// Add loading states for dynamic content
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Simulate data loading
function loadDashboardData() {
    // Simulate API calls
    return Promise.all([
        loadNotices(),
        loadUpcomingMatches(),
        loadInventoryStatus()
    ]);
}

function loadNotices() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { title: 'Training Schedule Updated', date: 'Aug 20, 2025' },
                { title: 'New Equipment Arrival', date: 'Aug 19, 2025' },
                { title: 'Match Result Posted', date: 'Aug 18, 2025', highlight: true }
            ]);
        }, 1000);
    });
}

function loadUpcomingMatches() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { type: 'match', opponent: 'Manchester FC', date: 'Aug 25, 2025', time: '3:00 PM' },
                { type: 'training', title: 'Training Session', date: 'Aug 22, 2025', time: '5:00 PM' }
            ]);
        }, 1200);
    });
}

function loadInventoryStatus() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Bibs', count: 45, status: 'in-stock' },
                { name: 'Footballs', count: 12, status: 'low-stock' },
                { name: 'Boots', count: 3, status: 'out-stock' },
                // ... more items
            ]);
        }, 800);
    });
}