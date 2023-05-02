const form = document.querySelector(".contact-form");
const submit = document.querySelector(".form-submit");
const sender = document.querySelector("#contact-name");
const email = document.querySelector("#contact-email");
const subject = document.querySelector("#contact-subject");
const message = document.querySelector("#contact-message");
const msgStatus = document.querySelector("#contact-status");

email.addEventListener("input", e => {
    if(email.validity.typeMismatch) {
        email.setCustomValidity("Email address expected!");
        email.reportValidity();
    }
    else {
        email.setCustomValidity("");
    }
});

function validate() {
    let success = true;
    if(!email.value) {
        success = false;
        showError(email);
    }
    if(!sender.value) {
        success = false;
        showError(sender);
    }
    if(!subject.value) {
        success = false;
        showError(subject);
    }
    if(!message.value) {
        success = false;
        showError(message);
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

function showError(e) {
    e.style.backgroundColor = "#ffcccb";
    e.setCustomValidity("All fields must be filled!");
    e.reportValidity();
}

function onSubmit(token) {
    let data = new FormData(form);

    fetch("https://martinbrablik.cz/php/mail.php", {
        method: "POST",
        body: data,
    }).then(response => response.text()).then(result => {
        msgStatus.setAttribute("style", "display: block;");
        msgStatus.innerHTML = result;
        console.log(result);
    }).catch(console.error);
}

submit.addEventListener("click", e => mail(e));	