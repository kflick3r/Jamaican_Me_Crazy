
/*** Dark Mode ***
    Purpose:
  - Dark mode feature
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }
}

// Step 3: Register a 'click' event listener for the theme button,
//         and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***/

// Step 1: Select the RSVP button
const rsvpButton = document.getElementById("rsvp-button");

// Step 2: Create the callback function
const addParticipant = (person) => {

    // Create a new participant paragraph
    const newParticipant = document.createElement("p");

    // Add the participant information
    newParticipant.textContent =
        "🎉 " + person.name + " has RSVP'd!";

    // Find the participants section
    const participants = document.querySelector(".rsvp-participants");

    // Remove the placeholder before adding the participants
    const placeholder = document.getElementById("rsvp-placeholder");

    if (placeholder) {
        placeholder.remove();
    }

    // Add the new participant to the page
    participants.appendChild(newParticipant);

    // Clear the form
    document.getElementById("rsvp-form").reset();
};



/*** Form Validation ***/

// Step 1: We already selected the RSVP button above.

// Step 2: Validate the form inputs
const validateForm = () => {

    let containsErrors = false;


    // Create an object with the RSVP information
    const person = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        guests: Number(document.getElementById("guests").value)
    };


    // Get all form inputs
    const rsvpInputs = document.getElementById("rsvp-form").elements;

    // Check each input
    for (let i = 0; i < rsvpInputs.length; i++) {

        // Trim whitespace from the input
        const inputValue = rsvpInputs[i].value.trim();

        // Check for empty or too-short inputs (number of guest )
        if (rsvpInputs[i].id !== "guests" && inputValue.length < 2) {
            containsErrors = true;
            rsvpInputs[i].classList.add("error");
        } else {
            rsvpInputs[i].classList.remove("error");
        }
    }

    // Validate email address
    const emailInput = document.getElementById("email");

    if (!person.email.includes("@")) {
        containsErrors = true;
        emailInput.classList.add("error");
    } else {
        emailInput.classList.remove("error");
    }

    // Validate number of guests
    const guestsInput = document.getElementById("guests");

    if (person.guests < 1 || !Number.isInteger(person.guests)) {

        containsErrors = true;
        guestsInput.classList.add("error");
    } else {
        guestsInput.classList.remove("error");
    }

    // Add participant only if all inputs are valid
    if (containsErrors === false) {

        // Add the person to the RSVP list
        addParticipant(person)

        // Display the success modal
        toggleModal(person);

        // Clear the form inputs and error styling
        for (let i = 0; i < rsvpInputs.length; i++) {
            rsvpInputs[i].value = "";
            rsvpInputs[i].classList.remove("error");
        }
    }
};

// Step 3: Register the new event listener
rsvpButton.addEventListener("click", validateForm);

/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [ ] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll(".revealable");

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add("active");
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            current.classList.remove("active");
        }
    }
}

// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener("scroll", reveal);

// Check which sections are visible when the page loads
reveal();


/*** Reduce Motion ***/

// Select the button
const motionButton = document.getElementById("motion-button");

// Toggle reduced motion on and off
const reduceMotion = () => {
    document.body.classList.toggle("reduce-motion");

    if (document.body.classList.contains("reduce-motion")) {
        motionButton.textContent = "Reduce Motion: On";
    } else {
        motionButton.textContent = "Reduce Motion: Off";
        reveal();
    }
};

// Register the event listener
motionButton.addEventListener("click", reduceMotion);



/*** Success Modal ***
    Purpose:
    - Display a personalized RSVP confirmation
    - Automatically close the modal after 5 seconds
***/


/*** Modal Image Animation ***/

// Select the image inside the modal
const modalImage = document.getElementById("modal-image");

// Track the image's rotation
let rotateFactor = 0;

// Animate the image
const animateImage = () => {

    // Alternate between two rotation angles
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }

    // Apply the rotation
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};


/*** Modal Controls ***/

// Store the animation interval and timeout
let modalIntervalId;
let modalTimeoutId;

// Select the Close button
const modalCloseButton = document.getElementById("modal-close");

// Close the modal and stop its animation
const closeModal = () => {

    const modal = document.getElementById("success-modal");

    // Hide the modal
    modal.style.display = "none";

    // Stop the animation and automatic timeout
    clearInterval(modalIntervalId);
    clearTimeout(modalTimeoutId);

    // Reset the image
    rotateFactor = 0;
    modalImage.style.transform = "rotate(0deg)";
};

// Display the success modal
const toggleModal = (person) => {

    const modal = document.getElementById("success-modal");
    const modalContent = document.getElementById("modal-text");

    // Clear any previous timers
    clearInterval(modalIntervalId);
    clearTimeout(modalTimeoutId);

    // Reset the image
    rotateFactor = 0;
    modalImage.style.transform = "rotate(0deg)";

    // Show the modal
    modal.style.display = "flex";

    // Personalized RSVP message
    modalContent.textContent =
        `Thanks for RSVPing, ${person.name}! ` +
        `We've reserved ${person.guests} ${person.guests === 1 ? "spot" : "spots"} ` +
        `for our February 2027 Jamaica getaway!`;

    // Only animate when Reduce Motion is off
    if (!document.body.classList.contains("reduce-motion")) {
        modalIntervalId = setInterval(animateImage, 500);
    }

    // Automatically close after 5 seconds
    modalTimeoutId = setTimeout(closeModal, 5000);
};

// Close button event listener
modalCloseButton.addEventListener("click", closeModal);