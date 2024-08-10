import { Request } from "./request.js";

let button = document.getElementById('get-link-button');

button.addEventListener('click', () => {
    let request = new Request('POST', {'Content-Type': 'application/json'}, 'send-rsvp-link'),
        emailInput = document.getElementById('email');
    request.body = emailInput.value.toLowerCase();
    emailInput.classList.add('display-none');
    button.classList.add('display-none');
    document.getElementById('instructions').innerHTML = "Email with your RSVP link is on its way";
    request.send().then(response => {
        if (!response.ok) {
            button.innerHTML = 'RESEND';
            button.classList.remove('display-none');
        } else {
            document.getElementById('label').innerHTML = 'Email has been sent';
            document.getElementById('instructions').classList.add('display-none');
        }
    })
});