import { FormHandler } from "form";

document.addEventListener('DOMContentLoaded', () => {
    let handler = new FormHandler(
        'GENERAL_ATTENDANCE',
        'progress-bar',
        'title',
        'root',
        'next-button',
        'previous-button',
        'loading-container',
        'form'
    );
});
