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



// Add functionality for "Add New Team" button
document.querySelector(".add-team").addEventListener("click", () => {
  alert("Add New Team functionality coming soon!");
});

// Add functionality for "View Details" buttons
document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    alert("Team details page will open.");
  });
});

// Back button functionality
document.querySelector(".back-btn").addEventListener("click", () => {
  alert("Going back to previous page...");
  // In real project, use: window.history.back();
});
