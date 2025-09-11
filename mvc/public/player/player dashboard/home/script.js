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


// Update current date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.innerHTML = `${dateStr}<br>${timeStr}`;
    }
}

// Calendar functionality
let currentMonth = 10; // November (0-based)
let currentYear = 2022;

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    const titleEl = document.getElementById('calendar-title');
    if (titleEl) {
        titleEl.textContent = `${months[currentMonth]} ${currentYear}`;
    }
}

// Meal plan functionality
const mealPlans = {
    breakfast: [
        'Basmati or Red rice',
        'Chicken, Egg, Fish',
        'Vegetable(minimum 3)',
        'Pala',
        'Yogurt',
        'Fruits'
    ],
    lunch: [
        'Rice or Bread',
        'Protein (Meat/Fish/Lentils)',
        'Mixed vegetables',
        'Salad',
        'Soup',
        'Dessert'
    ],
    dinner: [
        'Light rice portion',
        'Grilled protein',
        'Steamed vegetables',
        'Clear soup',
        'Herbal tea',
        'Light fruits'
    ]
};

function showMealTab(mealType) {
    // Update tab buttons
    document.querySelectorAll('.meal-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update meal items
    const mealItems = document.getElementById('meal-items');
    if (mealItems) {
        mealItems.innerHTML = '';
        mealPlans[mealType].forEach(item => {
            const li = document.createElement('li');
            li.className = 'meal-item';
            li.textContent = item;
            mealItems.appendChild(li);
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Calendar day click functionality
function initializeCalendar() {
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', function() {
            if (!this.classList.contains('other-month')) {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('current'));
                this.classList.add('current');
            }
        });
    });
}

// Add hover effects and animations
function initializeAnimations() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Countdown timer functionality
function updateCountdown() {
    const championshipDate = new Date('2025-08-30');
    const today = new Date();
    const timeDiff = championshipDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const countdownElement = document.querySelector('.countdown-number');
    if (countdownElement && daysDiff > 0) {
        countdownElement.textContent = daysDiff;
    }
}

// Initialize practice and event times (dummy for now)
function initializeTimes() {
    const practiceTime = document.querySelector('.practice-time');
    const eventTimes = document.querySelectorAll('.event-time');
    // Static for now — can fetch dynamic later
}

// Main initialization function
function initializeApp() {
    updateDateTime();
    updateCountdown();
    initializeNavigation();
    initializeCalendar();
    initializeAnimations();
    initializeTimes();

    // Auto-update
    setInterval(updateDateTime, 60000);     // every minute
    setInterval(updateCountdown, 86400000); // every day

    console.log('UOC Football Dashboard initialized successfully');
}

// Start app
document.addEventListener('DOMContentLoaded', initializeApp);

// ========== UTILS ==========
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}
