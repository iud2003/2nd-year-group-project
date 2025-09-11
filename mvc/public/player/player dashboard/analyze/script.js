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



// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize circular progress bars
    initializeCircularProgress();
    
    // Initialize chart
    initializeChart();
    
    // Add smooth scrolling and animations
    initializeAnimations();
});

// Initialize circular progress bars
function initializeCircularProgress() {
    const progressBars = document.querySelectorAll('.circular-progress');
    
    progressBars.forEach((progress, index) => {
        const percentage = parseInt(progress.getAttribute('data-percentage'));
        const circle = progress.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        // Set up the circle
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        // Set colors based on metric type
        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];
        circle.style.stroke = colors[index % colors.length];
        
        // Animate with delay
        setTimeout(() => {
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }, index * 200);
    });
}

// Initialize the trends chart
function initializeChart() {
    const canvas = document.getElementById('trendsChart');
    const ctx = canvas.getContext('2d');
    
    // Chart data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Endurance',
                data: [75, 78, 82, 86, 88, 90],
                color: '#8b5cf6',
                points: []
            },
            {
                label: 'Sprint Speed',
                data: [70, 72, 74, 77, 80, 84],
                color: '#10b981',
                points: []
            },
            {
                label: 'Agility',
                data: [68, 70, 75, 77, 81, 83],
                color: '#f59e0b',
                points: []
            }
        ]
    };
    
    // Chart dimensions
    const padding = 60;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Scale data to chart dimensions
    const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
    const minValue = Math.min(...data.datasets.flatMap(d => d.data));
    const valueRange = maxValue - minValue;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set styles
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (i * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = Math.round(maxValue - (i * valueRange / 5));
        ctx.fillStyle = '#6b7280';
        ctx.textAlign = 'right';
        ctx.fillText(value, padding - 10, y + 4);
    }
    
    // Draw x-axis labels
    data.labels.forEach((label, index) => {
        const x = padding + (index * chartWidth / (data.labels.length - 1));
        ctx.fillStyle = '#6b7280';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, canvas.height - padding + 20);
    });
    
    // Draw lines and points
    data.datasets.forEach((dataset, datasetIndex) => {
        ctx.strokeStyle = dataset.color;
        ctx.fillStyle = dataset.color;
        ctx.lineWidth = 3;
        
        // Calculate points
        const points = dataset.data.map((value, index) => {
            const x = padding + (index * chartWidth / (data.labels.length - 1));
            const y = padding + chartHeight - ((value - minValue) / valueRange * chartHeight);
            return { x, y };
        });
        
        // Draw line with animation
        let currentPointIndex = 0;
        
        function drawAnimatedLine() {
            if (currentPointIndex < points.length - 1) {
                const currentPoint = points[currentPointIndex];
                const nextPoint = points[currentPointIndex + 1];
                
                ctx.beginPath();
                ctx.moveTo(currentPoint.x, currentPoint.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.stroke();
                
                currentPointIndex++;
                setTimeout(drawAnimatedLine, 100);
            }
            
            // Draw all points
            points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
        
        setTimeout(() => drawAnimatedLine(), datasetIndex * 300);
    });
    
    // Draw legend
    const legendY = canvas.height - 20;
    let legendX = padding;
    
    data.datasets.forEach((dataset, index) => {
        // Legend color box
        ctx.fillStyle = dataset.color;
        ctx.fillRect(legendX, legendY - 10, 15, 10);
        
        // Legend text
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'left';
        ctx.fillText(dataset.label, legendX + 20, legendY - 2);
        
        legendX += ctx.measureText(dataset.label).width + 50;
    });
}

// Initialize animations
function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.metric-card, .chart-container, .comparison-container, .stat-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add pulse animation to notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        setInterval(() => {
            notificationIcon.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                notificationIcon.style.animation = '';
            }, 1000);
        }, 5000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .metric-card, .chart-container, .comparison-container, .stat-card {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Responsive chart resize
window.addEventListener('resize', function() {
    setTimeout(initializeChart, 100);
});

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});