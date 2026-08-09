"use strict";
/* get form element */
const form = document.querySelector("#contact-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const overlay = document.querySelector("#overlay");
const overlayP = document.querySelector("#overlay-p");


/* helper functions */
function showError(input, message) {
        const errorEL = input.nextElementSibling;
    errorEL.textContent = message;
}
function clearError(input) {
    const errorEL = input.nextElementSibling;
    errorEL.textContent = "";
}
function addClass(input ) {
            input.classList.add("form-message-error");
}
function removeClass( input) {
            input.classList.remove("form-message-error");
}
function showOverlay() {
    overlay.classList.add("show-overlay")
}
function closeOverlay() {
    setTimeout(() => {
        overlay.classList.remove("show-overlay");
    }, 5000);
}
/* validate inputs */

function validateName(input) {
    const nameReg = /^[A-Za-z][A-Za-z\s'-]{1,}$/;
    const nameVal = input.value.trim();

    if (!nameReg.test(nameVal)) {
        addClass(input );
        showError(input, "Name can only contains alphabelts")
        return false;
    } 
    removeClass(input);
    clearError(input);
    return true;
}
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailVal = input.value.trim();

    if (!emailRegex.test(emailVal)) {
        addClass(input);
        showError(input, "Enter a valid email address e.g example@email");
        return false;
    };
    removeClass(input);
    clearError(input);
    return true;
}function validateTel(input) {
	const telephoneReg = /^\+?[\d\s\-\(\)]{7,16}$/;

	const telValue = input.value.trim();

	if (!telephoneReg.test(telValue)) {
		addClass(input);
		showError(
			input,
			"Please enter a valid phone number (7–16 digits, numbers only)",
		);
		return false;
	}
	removeClass(input);
	clearError(input);
	return true;
}
function validateMessage(input) {
    const textarea = input;
    if (textarea.value.trim() < 5) {
			addClass(input);
        showError(input, "Message must be   above 5 characters.");
        return false;
    };
    removeClass(input);
    clearError(input);
    return true;
}

/* validate when input is out of focus */
name.addEventListener("blur", (e) => validateName(e.target));
email.addEventListener("blur", (e) => validateEmail(e.target));
telephone.addEventListener("blur", (e) => validateTel(e.target));
message.addEventListener("blur", (e) => validateMessage(e.target));


/* handle form submission */

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = "https://formspree.io/f/mredrolk";
    const formData = new FormData(form);
    const validName = validateName(name);
    const validEmail = validateEmail(email);
    const validTelephone = validateTel(telephone);
    const validMessage = validateMessage(message);

    if (!validName || !validEmail || !validTelephone || !validMessage) { return; };

    /* send post request to formspree */
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {"Accept" : "application/json"},
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            
             form.reset();
            showOverlay();
            overlayP.textContent = "Thanks! submitted successfully, we will respond between 1-2 business days. 😊";
            closeOverlay();

        } else {

            showOverlay();
            overlayP.textContent = "Failed to send!, check your internet connection and try again.";
            closeOverlay();

        }
    } catch (error) {

        console.error("Error:", error.message);
        showOverlay();
		overlayP.textContent ="Error! failed to establish connection to server..";
        closeOverlay();
        
    }
})