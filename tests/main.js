import { FormHandler } from "./form.js";

document.addEventListener('DOMContentLoaded', () => {
    let handler = new FormHandler(
        'FLIGHT_INFORMATION',
        'progress-bar',
        'title',
        'root',
        'next-button',
        'previous-button',
        'loading-container',
        'form'
    );
});
