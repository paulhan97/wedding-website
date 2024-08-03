toggleButtons = document.querySelectorAll('.collapse-toggle');

Array.from(toggleButtons).forEach(function(element) {
    element.addEventListener('click', (event) => {
        toggleButton = event.target;
        question = toggleButton.parentElement;
        answer = question.nextElementSibling;
        answer.classList.toggle('uncollapsed');
        // The "plus" class is to workaround a strange bug with using the innerHTML values
        if (toggleButton.classList.contains('plus')) {
            toggleButton.innerHTML = '&#x2796;&#xFE0E;';
            toggleButton.classList.remove('plus')
        } else {
            toggleButton.innerHTML = '&#x2795;&#xFE0E;';
            toggleButton.classList.add('plus')
        }
    });
});