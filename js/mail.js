const form = document.querySelector(".contact-form");
const submit = document.querySelector(".form-submit");
const sender = document.querySelector("#contact-name");
const email = document.querySelector("#contact-email");
const subject = document.querySelector("#contact-subject");
const message = document.querySelector("#contact-message");
const msgStatus = document.querySelector("#contact-status");

email.addEventListener("blur", e => {
    if(email.validity.typeMismatch) {
        showError(email, "Please enter a valid email address.");
    }
    else {
        email.setCustomValidity("");
    }
});

function validate() {
    let success = true;
    if(!email.value) {
        success = false;
        showError(email, "Email address must be filled.");
    }
    if(email.validity.typeMismatch) {
        success = false;
        showError(email, "Please enter a valid email address.");
    }
    if(!sender.value) {
        success = false;
        showError(sender, "Your name must be filled.");
    }
    if(!subject.value) {
        success = false;
        showError(subject, "Subject must be filled.");
    }
    if(!message.value) {
        success = false;
        showError(message, "Message must be filled.");
    }
    return success;
}

function mail(e) {
    e.preventDefault();
    
    if(validate()) {
        grecaptcha.execute();
    }
    else {
        console.log("fail");
    }
}

function showError(e, message) {
    e.style.backgroundColor = "#ffcccb";
    e.setCustomValidity(message);
    e.reportValidity();
}

function onSubmit(token) {
    let data = new FormData(form);

    fetch("https://martinbrablik.maweb.eu/php/mail.php", {
        method: "POST",
        body: data,
    }).then(response => response.text()).then(result => {
        msgStatus.setAttribute("style", "display: block;");
        msgStatus.innerHTML = result;
        console.log(result);
    }).catch(console.error);
}

submit.addEventListener("click", e => mail(e));	