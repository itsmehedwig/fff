// Loading Animation Functions

function showLoading(message = 'Loading...', submessage = 'Please wait') {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    const loadingSubtext = document.getElementById('loading-subtext');
    
    if (overlay) {
        if (loadingText) loadingText.textContent = message;
        if (loadingSubtext) loadingSubtext.textContent = submessage;
        overlay.classList.add('active');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Auto-show loading on form submit
document.addEventListener('DOMContentLoaded', function() {
    // Login form loading
    const loginForm = document.querySelector('form[action*="login"]');
    if (loginForm && !loginForm.classList.contains('no-loading')) {
        loginForm.addEventListener('submit', function() {
            showLoading('Signing in...', 'Verifying your credentials');
        });
    }
    
    // CSV Import forms loading
    const importForms = document.querySelectorAll('form[action*="import"]');
    importForms.forEach(form => {
        if (!form.classList.contains('no-loading')) {
            form.addEventListener('submit', function(e) {
                const fileInput = form.querySelector('input[type="file"]');
                if (fileInput && fileInput.files.length > 0) {
                    const formAction = form.action;
                    if (formAction.includes('books')) {
                        showLoading('Importing Books...', 'Processing CSV file, please be patient');
                    } else if (formAction.includes('students')) {
                        showLoading('Importing Students...', 'Processing CSV file, please be patient');
                    } else {
                        showLoading('Importing...', 'Processing file');
                    }
                } else {
                    e.preventDefault();
                    alert('Please select a file to import');
                }
            });
        }
    });
    
    // Registration form loading
    const registerForm = document.querySelector('form[action*="register"]');
    if (registerForm && !registerForm.classList.contains('no-loading')) {
        registerForm.addEventListener('submit', function() {
            showLoading('Creating Account...', 'Setting up your profile');
        });
    }
    
    // Generic forms with data-loading attribute
    const loadingForms = document.querySelectorAll('form[data-loading]');
    loadingForms.forEach(form => {
        form.addEventListener('submit', function() {
            const message = form.getAttribute('data-loading-message') || 'Processing...';
            const submessage = form.getAttribute('data-loading-submessage') || 'Please wait';
            showLoading(message, submessage);
        });
    });
});

// Hide loading on page load (in case of back button navigation)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        hideLoading();
    }
});
