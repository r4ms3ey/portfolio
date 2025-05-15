// Survey page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientSurvey');
    const sections = document.querySelectorAll('.survey-section');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    let currentSection = 0;
    const totalSections = sections.length;
    
    // Initialize form
    showSection(currentSection);
    updateProgress();
    updateButtons();
    
    // Conditional questions
    const projectTypeRadios = document.querySelectorAll('input[name="projectType"]');
    const budgetSelect = document.getElementById('budget');
    
    // Show/hide "Other" project type field
    projectTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const otherProjectType = document.getElementById('otherProjectType');
            otherProjectType.style.display = this.value === 'other' ? 'block' : 'none';
        });
    });
    
    // Show/hide low budget note
    budgetSelect.addEventListener('change', function() {
        const lowBudgetNote = document.getElementById('lowBudgetNote');
        lowBudgetNote.style.display = this.value === 'under1k' ? 'block' : 'none';
    });
    
    // Navigation buttons
    nextBtn.addEventListener('click', function() {
        if (validateCurrentSection()) {
            currentSection++;
            showSection(currentSection);
            updateProgress();
            updateButtons();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        currentSection--;
        showSection(currentSection);
        updateProgress();
        updateButtons();
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateCurrentSection()) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for completing the survey!');
            form.reset();
            currentSection = 0;
            showSection(currentSection);
            updateProgress();
            updateButtons();
        }
    });
    
    // Helper functions
    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
    }
    
    function updateProgress() {
        const progress = ((currentSection + 1) / totalSections) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
    }
    
    function updateButtons() {
        prevBtn.disabled = currentSection === 0;
        nextBtn.style.display = currentSection < totalSections - 1 ? 'block' : 'none';
        submitBtn.style.display = currentSection === totalSections - 1 ? 'block' : 'none';
    }
    
    function validateCurrentSection() {
        let isValid = true;
        const currentSectionFields = sections[currentSection].querySelectorAll('[required]');
        
        currentSectionFields.forEach(field => {
            const errorId = `${field.name}Error`;
            const errorElement = document.getElementById(errorId);
            
            if (!field.value.trim()) {
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                    errorElement.classList.add('show');
                }
                isValid = false;
            } else if (field.type === 'email' && !validateEmail(field.value)) {
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.classList.add('show');
                }
                isValid = false;
            } else {
                field.classList.remove('error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
        
        // Special validation for radio buttons
        if (currentSection === 1) {
            const projectTypeSelected = document.querySelector('input[name="projectType"]:checked');
            const projectTypeError = document.getElementById('projectTypeError');
            
            if (!projectTypeSelected) {
                projectTypeError.textContent = 'Please select an option';
                projectTypeError.classList.add('show');
                isValid = false;
            } else {
                projectTypeError.classList.remove('show');
            }
        }
        
        // Special validation for checkboxes
        if (currentSection === 3) {
            const agreeChecked = document.querySelector('input[name="agree"]:checked');
            const agreeError = document.getElementById('agreeError');
            
            if (!agreeChecked) {
                agreeError.textContent = 'You must agree to the privacy policy';
                agreeError.classList.add('show');
                isValid = false;
            } else {
                agreeError.classList.remove('show');
            }
        }
        
        return isValid;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});