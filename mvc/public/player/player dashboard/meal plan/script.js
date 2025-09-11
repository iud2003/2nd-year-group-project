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


// Meal plan data for different meal types
const mealPlans = {
    breakfast: {
        monday: { items: ['Basmati Rice', 'Scrambled Eggs', 'Fresh Fruits', 'Green Tea'], calories: 480 },
        tuesday: { items: ['Oatmeal', 'Boiled Eggs', 'Banana', 'Milk'], calories: 520 },
        wednesday: { items: ['Whole Wheat Toast', 'Omelet', 'Orange Juice', 'Yogurt'], calories: 495 },
        thursday: { items: ['Quinoa Bowl', 'Poached Eggs', 'Avocado', 'Herbal Tea'], calories: 510 },
        friday: { items: ['Pancakes', 'Honey', 'Berries', 'Coffee'], calories: 475 },
        saturday: { items: ['Smoothie Bowl', 'Granola', 'Nuts', 'Protein Shake'], calories: 530 }
    },
    lunch: {
        monday: { items: ['Grilled Chicken', 'Brown Rice', 'Steamed Vegetables', 'Water'], calories: 650 },
        tuesday: { items: ['Salmon Fillet', 'Quinoa Salad', 'Mixed Greens', 'Lemon Water'], calories: 680 },
        wednesday: { items: ['Turkey Sandwich', 'Sweet Potato', 'Side Salad', 'Green Tea'], calories: 620 },
        thursday: { items: ['Beef Stir-fry', 'Jasmine Rice', 'Broccoli', 'Coconut Water'], calories: 720 },
        friday: { items: ['Tuna Salad', 'Whole Grain Bread', 'Cucumber', 'Sparkling Water'], calories: 580 },
        saturday: { items: ['Protein Bowl', 'Black Beans', 'Avocado', 'Fresh Juice'], calories: 640 }
    },
    dinner: {
        monday: { items: ['Baked Cod', 'Roasted Vegetables', 'Wild Rice', 'Herbal Tea'], calories: 520 },
        tuesday: { items: ['Chicken Breast', 'Mashed Cauliflower', 'Green Beans', 'Water'], calories: 480 },
        wednesday: { items: ['Lean Beef', 'Roasted Sweet Potato', 'Asparagus', 'Chamomile Tea'], calories: 580 },
        thursday: { items: ['Grilled Salmon', 'Quinoa Pilaf', 'Spinach Salad', 'Lemon Water'], calories: 620 },
        friday: { items: ['Turkey Meatballs', 'Zucchini Noodles', 'Marinara Sauce', 'Green Tea'], calories: 450 },
        saturday: { items: ['Pork Tenderloin', 'Roasted Brussels Sprouts', 'Brown Rice', 'Water'], calories: 540 }
    }
};

// Nutrition data for different meals
const nutritionData = {
    breakfast: { calories: 2850, protein: 185, carbs: 320, fat: 95 },
    lunch: { calories: 3200, protein: 210, carbs: 280, fat: 105 },
    dinner: { calories: 2650, protein: 175, carbs: 240, fat: 85 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMealPlan();
    setupEventListeners();
    addInteractiveEffects();
});

// Initialize meal plan with breakfast data
function initializeMealPlan() {
    updateMealPlan('breakfast');
}

// Setup event listeners
function setupEventListeners() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mealType = this.getAttribute('data-meal');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update meal plan
            updateMealPlan(mealType);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Update meal plan based on selected meal type
function updateMealPlan(mealType) {
    const dayCards = document.querySelectorAll('.day-card');
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    dayCards.forEach((card, index) => {
        const day = days[index];
        const dayData = mealPlans[mealType][day];
        
        // Add fade out animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Update calories
            const caloriesSpan = card.querySelector('.calories');
            caloriesSpan.textContent = `${dayData.calories} cal`;
            
            // Update meal items
            const mealItemsList = card.querySelector('.meal-items');
            mealItemsList.innerHTML = '';
            
            dayData.items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-circle"></i> ${item}`;
                mealItemsList.appendChild(li);
            });
            
            // Add fade in animation
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200);
    });
    
    // Update nutrition data
    updateNutritionStats(mealType);
}

// Update nutrition statistics
function updateNutritionStats(mealType) {
    const nutrition = nutritionData[mealType];
    const stats = document.querySelectorAll('.stat .value');
    
    stats[0].textContent = nutrition.calories.toLocaleString();
    stats[1].textContent = `${nutrition.protein}g`;
    stats[2].textContent = `${nutrition.carbs}g`;
    stats[3].textContent = `${nutrition.fat}g`;
    
    // Add counter animation
    stats.forEach(stat => {
        stat.style.transform = 'scale(1.1)';
        stat.style.color = '#8B5CF6';
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
            stat.style.color = '#1F2937';
        }, 300);
    });
}

// Add interactive effects
function addInteractiveEffects() {
    // Add hover effects to day cards
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect to meal items
        const mealItems = card.querySelectorAll('.meal-items li');
        mealItems.forEach(item => {
            item.addEventListener('click', function() {
                // Toggle completed state
                this.style.opacity = this.style.opacity === '0.5' ? '1' : '0.5';
                this.style.textDecoration = this.style.textDecoration === 'line-through' ? 'none' : 'line-through';
                
                // Add completion animation
                const icon = this.querySelector('i');
                if (this.style.opacity === '0.5') {
                    icon.className = 'fas fa-check-circle';
                    icon.style.color = '#10B981';
                } else {
                    icon.className = 'fas fa-circle';
                    icon.style.color = '#8B5CF6';
                }
            });
        });
    });
    
    // Add floating animation to nutrition cards
    animateFloating();
    
    // Add progress bars to nutrition stats
    addProgressBars();
    
    // Add notification system
    setupNotifications();
}

// Floating animation for cards
function animateFloating() {
    const cards = document.querySelectorAll('.nutrition-card, .updates-card');
    
    cards.forEach((card, index) => {
        setInterval(() => {
            card.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 3}px)`;
        }, 50);
    });
}

// Add progress bars to nutrition stats
function addProgressBars() {
    const stats = document.querySelectorAll('.stat');
    const maxValues = { calories: 3500, protein: 250, carbs: 400, fat: 120 };
    const labels = ['calories', 'protein', 'carbs', 'fat'];
    
    stats.forEach((stat, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: #E5E7EB;
            border-radius: 2px;
            margin-top: 0.5rem;
            overflow: hidden;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #8B5CF6, #A855F7);
            border-radius: 2px;
            transition: width 1s ease;
            width: 0%;
        `;
        
        progressBar.appendChild(progressFill);
        stat.appendChild(progressBar);
        
        // Animate progress bar
        setTimeout(() => {
            const currentValue = parseInt(stat.querySelector('.value').textContent.replace(/[^\d]/g, ''));
            const percentage = (currentValue / maxValues[labels[index]]) * 100;
            progressFill.style.width = `${Math.min(percentage, 100)}%`;
        }, 500);
    });
}

// Setup notification system
function setupNotifications() {
    // Simulate real-time updates
    setTimeout(() => {
        showNotification('Meal reminder: Time for your scheduled snack!', 'info');
    }, 5000);
    
    setTimeout(() => {
        showNotification('Great job! You\'ve completed 80% of today\'s nutrition goals.', 'success');
    }, 10000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
        max-width: 300px;
        z-index: 1000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}" 
               style="color: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#3B82F6'};"></i>
            <p style="margin: 0; font-size: 0.9rem; color: #374151;">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; font-size: 1.2rem; color: #9CA3AF; cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(139, 92, 246, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .day-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .meal-items li {
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 8px;
        padding: 0.5rem;
        margin: 0.25rem 0;
    }
    
    .meal-items li:hover {
        background: rgba(139, 92, 246, 0.1);
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const tabs = document.querySelectorAll('.tab-btn');
    const activeTab = document.querySelector('.tab-btn.active');
    const currentIndex = Array.from(tabs).indexOf(activeTab);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        tabs[currentIndex - 1].click();
    } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
        tabs[currentIndex + 1].click();
    }
});

// Performance optimization: Debounced resize handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    // Recalculate any responsive elements if needed
    console.log('Window resized - recalculating layout');
}, 250));