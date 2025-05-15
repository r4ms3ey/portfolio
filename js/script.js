// Main JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Set time-based greeting
    setGreeting();
    
    // Initialize dark mode from localStorage
    initTheme();
    
    // Add event listeners
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Contact form validation if on contact page
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', validateContactForm);
    }
});

// Time-based greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    
    if (!greeting) return;
    
    let timeGreeting;
    if (hour < 12) {
        timeGreeting = 'Good Morning!';
    } else if (hour < 18) {
        timeGreeting = 'Good Afternoon!';
    } else {
        timeGreeting = 'Good Evening!';
    }
    
    greeting.textContent = `${timeGreeting} Welcome to My Portfolio`;
}

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update button text
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.textContent = isDark ? '🌙/☀️' : '☀️/🌙';
}

// Contact form validation
function validateContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();
    
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    // Validate name
    if (!name) {
        showError('nameError', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('emailError', 'Please enter your email');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone if provided
    if (phone) {
        const phoneRegex = /^[\d\s\-()+]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Validate message
    if (!message) {
        showError('messageError', 'Please enter your message');
        isValid = false;
    }
    
    if (isValid) {
        // In a real application, you would submit the form here
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    }
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}
