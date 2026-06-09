"use strict";

// ===== FORMSPREE FORM HANDLER =====
// Handles form submission, validation, and feedback via Formspree SDK

(function initializeForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.querySelector('[data-fs-success]');
    const errorMessage = document.querySelector('[data-fs-error]');

    if (!form) return;

    // Initialize Formspree with form configuration
    window.formspree = window.formspree || function () {
        (formspree.q = formspree.q || []).push(arguments);
    };

    formspree('initForm', {
        formElement: '#contactForm',
        formId: 'mredrolk'
    });

    // Listen for form submission
    form.addEventListener('submit', (e) => {
        clearMessages();
    });

    // Listen for form reset after success
    const observer = new MutationObserver(() => {
        if (successMessage && successMessage.style.display !== 'none') {
            handleSuccess();
        }
    });

    observer.observe(successMessage, { attributes: true, attributeFilter: ['style'] });

    // ===== HELPER FUNCTIONS =====

    function clearMessages() {
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
    }

    function handleSuccess() {
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);

        // Scroll to success message
        successMessage?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ===== FIELD FOCUS HANDLERS =====
    // Clear field errors when user starts typing
    document.querySelectorAll('[data-fs-field]').forEach(field => {
        field.addEventListener('focus', () => {
            field.setAttribute('aria-invalid', 'false');
        });
    });
})();
