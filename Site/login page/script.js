// DOM Elements
const loginForm = document.getElementById('loginForm');
const indexNumberInput = document.getElementById('indexNumber');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const homeBtn = document.getElementById('homeBtn');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');

// Form validation
function validateForm() {
    const indexNumber = indexNumberInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (indexNumber === '' || password === '') {
        return false;
    }
    
    // Basic index number format validation (adjust as needed)
    const indexPattern = /^[A-Za-z0-9]+$/;
    if (!indexPattern.test(indexNumber)) {
        return false;
    }
    
    return true;
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #dc2626;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
        font-size: 14px;
        text-align: left;
    `;
    errorDiv.textContent = message;
    
    loginForm.insertBefore(errorDiv, loginForm.firstChild);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        color: #059669;
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
        font-size: 14px;
        text-align: left;
    `;
    successDiv.textContent = message;
    
    loginForm.insertBefore(successDiv, loginForm.firstChild);
}

// Handle form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Remove previous messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    if (!validateForm()) {
        showError('Please enter a valid index number and password.');
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    // Get form data
    const formData = {
        indexNumber: indexNumberInput.value.trim(),
        password: passwordInput.value.trim()
    };
    
    try {
        // Simulate API call (replace with actual endpoint)
        await simulateLogin(formData);
        
        // Success - redirect or show success message
        showSuccess('Login successful! Redirecting...');
        
        // Simulate redirect after 2 seconds
        setTimeout(() => {
            // Replace with actual redirect
            // window.location.href = '/dashboard';
            console.log('Redirecting to dashboard...');
        }, 2000);
        
    } catch (error) {
        showError(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
        // Remove loading state
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
});

// Simulate login API call
async function simulateLogin(credentials) {
    // Replace this with actual API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different responses based on credentials
            if (credentials.indexNumber === 'demo' && credentials.password === 'password') {
                resolve({ success: true, message: 'Login successful' });
            } else {
                reject(new Error('Invalid index number or password'));
            }
        }, 1500); // Simulate network delay
    });
}

// Input validation and styling
function setupInputValidation() {
    const inputs = [indexNumberInput, passwordInput];
    
    inputs.forEach(input => {
        // Remove error styling on input
        input.addEventListener('input', function() {
            this.style.borderColor = '#e5e7eb';
            const errorMsg = document.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
        
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#6b46c1';
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
}

// Handle home button click - REMOVED to allow HTML link to work
// The home button now works directly through HTML href attribute

// Handle forgot password click
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    // Add forgot password logic here
    alert('Forgot password functionality would be implemented here');
    // window.location.href = '/forgot-password';
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && (indexNumberInput === document.activeElement || passwordInput === document.activeElement)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        indexNumberInput.value = '';
        passwordInput.value = '';
        indexNumberInput.focus();
    }
});

// Auto-focus on index number input when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupInputValidation();
    indexNumberInput.focus();
});

// Handle form reset
function resetForm() {
    loginForm.reset();
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
    indexNumberInput.focus();
}

// Expose reset function globally if needed
window.resetLoginForm = resetForm;