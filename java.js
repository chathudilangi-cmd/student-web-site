
function displayDynamicGreeting() {
    
    const date = new Date();
    const hour = date.getHours();
    let greeting;

    
    if (hour < 12) {
        greeting = "Good Morning, Future Leader! ☀️"; 
    } else if (hour < 18) {
        greeting = "Good Afternoon, Future Leader! 🌅"; 
    } else {
        greeting = "Good Evening, Future Leader! 🌙"; 
    }

    
    const greetingElement = document.getElementById('greeting-text');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}


function initDynamicBehavior() {
    
    displayDynamicGreeting(); 
    setInterval(displayDynamicGreeting, 30000); 
}
document.addEventListener('DOMContentLoaded', initDynamicBehavior);

document.addEventListener('DOMContentLoaded', () => {
    // --- Common Elements & Utility Functions ---
    const editFormOverlay = document.getElementById('edit-form-overlay');
    const editProfileForm = document.getElementById('edit-profile-form');
    const profileValidationMessage = document.getElementById('profile-validation-message');
    const studentCard = document.getElementById('student-profile-card');

    function displayMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    }

    function clearMessage(element) {
        element.style.display = 'none';
        element.textContent = '';
    }

    // --- REQUIREMENT 2: Edit Profile (Dynamic Behavior) ---
    
    document.getElementById('open-edit-form-btn').addEventListener('click', () => {
        // Load current data into the form inputs
        document.getElementById('input-name').value = document.getElementById('display-name').textContent;
        document.getElementById('input-reg-num').value = document.getElementById('display-reg-num').textContent;
        document.getElementById('input-program').value = document.getElementById('display-program').textContent;
        document.getElementById('input-email').value = document.getElementById('display-email').textContent;
        
        clearMessage(profileValidationMessage);
        editFormOverlay.style.display = 'flex';
    });

    document.getElementById('close-edit-form-btn').addEventListener('click', () => {
        editFormOverlay.style.display = 'none';
        clearMessage(profileValidationMessage);
    });

    // --- REQUIREMENT 1: Form Validation & Submission ---

    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearMessage(profileValidationMessage);

        const formElements = editProfileForm.elements;
        let allValid = true;

        // Custom validation check
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            
            // Skip buttons
            if (element.type === 'submit' || element.type === 'button') continue;

            if (!element.checkValidity()) {
                allValid = false;
                // Display the default browser error, or a custom one if possible
                displayMessage(profileValidationMessage, `Error in ${element.name}: Please check the field format.`, 'error');
                element.focus();
                break; 
            }
        }

        if (allValid) {
            // Update profile information (Requirement 2 completion)
            document.getElementById('display-name').textContent = document.getElementById('input-name').value;
            document.getElementById('display-reg-num').textContent = document.getElementById('input-reg-num').value;
            document.getElementById('display-program').textContent = document.getElementById('input-program').value;
            document.getElementById('display-email').textContent = document.getElementById('input-email').value;

            displayMessage(profileValidationMessage, 'Profile updated successfully!', 'success');
            
            // Close form after a short delay
            setTimeout(() => {
                editFormOverlay.style.display = 'none';
                clearMessage(profileValidationMessage);
            }, 1500);

        } else {
            // Error message already set inside the loop
        }
    });

    // --- REQUIREMENT 3: Calculate Credits ---

    const creditInputs = document.querySelectorAll('.credit-input');
    const totalCreditsDisplay = document.getElementById('total-credits-display');
    const calculateBtn = document.getElementById('calculate-credits-btn');
    const creditValidationMessage = document.getElementById('credit-validation-message');

    calculateBtn.addEventListener('click', () => {
        clearMessage(creditValidationMessage);
        let totalCredits = 0;
        let allValid = true;

        creditInputs.forEach(input => {
            const value = parseInt(input.value);

            if (isNaN(value) || value < 0) {
                allValid = false;
                displayMessage(creditValidationMessage, 'All credit fields must contain valid positive numbers.', 'error');
                return;
            }
            totalCredits += value;
        });

        if (allValid) {
            totalCreditsDisplay.textContent = totalCredits;
            displayMessage(creditValidationMessage, `Calculation Complete: Total Credits are ${totalCredits}`, 'success');
        } else {
            totalCreditsDisplay.textContent = 'Error';
        }
    });
});