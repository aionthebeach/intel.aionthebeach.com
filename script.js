// Basic script for potential future interactivity

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tycoon Brief landing page loaded.');

    // Add intelligence briefing-style animations to buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    const mainCtaButton = document.querySelector('#new-hero .cta-button');
    
    // Add pulse animation to main CTA button
    if (mainCtaButton) {
        mainCtaButton.classList.add('button-pulse');
        
        // Add typewriter effect to main CTA button
        const originalText = mainCtaButton.textContent;
        mainCtaButton.textContent = '';
        let i = 0;
        
        // Simulate typing with a slight delay
        const typeWriter = () => {
            if (i < originalText.length) {
                mainCtaButton.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Add "classified" hover effect to all buttons
    ctaButtons.forEach(button => {
        // Add data-text attribute to store original text
        button.setAttribute('data-text', button.textContent);
        
        // Add click effect that simulates a digital scan
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('scanning')) {
                this.classList.add('scanning');
                
                const buttonText = this.textContent;
                this.textContent = 'PROCESSING';
                
                // Create and append scanning line
                const scanLine = document.createElement('span');
                scanLine.classList.add('scan-line');
                this.appendChild(scanLine);
                
                // Reset after animation completes
                setTimeout(() => {
                    this.textContent = buttonText;
                    this.classList.remove('scanning');
                    if (scanLine.parentNode === this) {
                        this.removeChild(scanLine);
                    }
                }, 1500);
            }
        });
    });

    const signupForm = document.querySelector('#fb-lead-form');
    const signupFormContainer = document.getElementById('signup-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission for now
            const emailInput = signupForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Track Facebook Pixel lead event
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_name: 'Tycoon Brief Signup',
                        content_category: 'Intelligence Brief Subscription',
                        value: 0.00,
                        currency: 'USD'
                    });
                    console.log('Facebook Lead event tracked');
                }
                
                // Get the submit button
                const submitButton = signupForm.querySelector('button[type="submit"]');
                
                if (submitButton) {
                    // First, show the processing effect
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'PROCESSING';
                    submitButton.disabled = true;
                    
                    // Create and add a scanning effect to the entire form
                    signupFormContainer.classList.add('scanning');
                    
                    // After a short delay, transition to the confirmation message
                    setTimeout(() => {
                        // Hide the form with animation
                        signupFormContainer.classList.add('fade-out');
                        
                        // After form fades out, show the confirmation message
                        setTimeout(() => {
                            // Remove hidden class and add show class for animation
                            confirmationMessage.classList.remove('hidden');
                            
                            // Force a reflow before adding the show class
                            void confirmationMessage.offsetWidth;
                            
                            confirmationMessage.classList.add('show');
                            
                            // Add typewriter effect to confirmation text
                            const confirmationText = document.querySelector('.confirmation-text');
                            if (confirmationText) {
                                const originalConfirmText = confirmationText.textContent;
                                confirmationText.textContent = '';
                                let j = 0;
                                
                                const typeConfirmation = () => {
                                    if (j < originalConfirmText.length) {
                                        confirmationText.textContent += originalConfirmText.charAt(j);
                                        j++;
                                        setTimeout(typeConfirmation, 40);
                                    }
                                };
                                
                                setTimeout(typeConfirmation, 300);
                            }
                            
                            // Play a subtle "classified" stamp animation
                            // This is handled by CSS animations
                            
                        }, 800); // Wait for form fade-out animation to complete
                        
                    }, 1500); // Wait for processing animation
                } else {
                    // Fallback if button not found
                    signupFormContainer.classList.add('fade-out');
                    setTimeout(() => {
                        confirmationMessage.classList.remove('hidden');
                        confirmationMessage.classList.add('show');
                    }, 800);
                }
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Accordion functionality for headshot tiles
    const tileHeaders = document.querySelectorAll('.tile-header');

    tileHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tile = header.closest('.headshot-tile');
            const details = tile.querySelector('.tile-details');

            if (tile && details) {
                // Check if the tile is currently active (before toggling)
                const isActive = tile.classList.contains('active');

                // Toggle the active class
                tile.classList.toggle('active');

                // Set max-height based on state AFTER toggling
                if (!isActive) { // Tile is now active (was not active before click)
                    // Set max-height to scrollHeight for expansion
                    details.style.maxHeight = details.scrollHeight + 'px';
                } else { // Tile is now inactive (was active before click)
                    // Reset max-height to allow CSS transition to 0
                    details.style.maxHeight = null;
                }

                 // Optional: Close other tiles
                 tileHeaders.forEach(otherHeader => {
                     const otherTile = otherHeader.closest('.headshot-tile');
                     const otherDetails = otherTile.querySelector('.tile-details');
                     if (otherTile && otherTile !== tile && otherTile.classList.contains('active')) {
                         otherTile.classList.remove('active');
                         if(otherDetails) {
                             otherDetails.style.maxHeight = null; // Also reset other tiles
                         }
                     }
                 });
            }
        });
    });
});
