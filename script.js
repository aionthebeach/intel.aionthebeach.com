// Basic script for expert card expansion and form submission
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tycoon Brief landing page loaded.');
    
    // Setup expert card expansion functionality
    const expertCards = document.querySelectorAll('.expert-card');
    
    // Add click events to each card
    expertCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Close other cards
            expertCards.forEach(otherCard => {
                if (otherCard !== this && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
        });
    });
    
    // Form submission handling
    const emailForm = document.querySelector('.email-form');
    const emailInput = emailForm.querySelector('input[type="email"]');
    const requestButton = emailForm.querySelector('.request-button');
    
    // Form submission handling
    const fbLeadForm = document.getElementById('fb-lead-form');
    
    fbLeadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (emailInput.value) {
            requestButton.textContent = 'Processing...';
            requestButton.disabled = true;
            
            // Track Facebook Pixel lead event if available
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Tycoon Brief Signup',
                    content_category: 'Intelligence Brief Subscription',
                    value: 0.00,
                    currency: 'USD'
                });
            }
            
            // Submit the form data via fetch API
            fetch(fbLeadForm.action, {
                method: 'POST',
                body: new FormData(fbLeadForm),
                mode: 'no-cors'
            })
            .then(() => {
                console.log('Form submitted successfully');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            })
            .finally(() => {
                // Show success state
                setTimeout(() => {
                    requestButton.textContent = 'Access Granted!';
                    requestButton.style.backgroundColor = '#2ecc71';
                    emailInput.value = '';
                    
                    // Reset button after some time
                    setTimeout(() => {
                        requestButton.textContent = 'Request Access';
                        requestButton.style.backgroundColor = '#cc3333';
                        requestButton.disabled = false;
                    }, 3000);
                }, 1500);
            });
        } else {
            alert('Please enter a valid email address.');
        }
    });
});
