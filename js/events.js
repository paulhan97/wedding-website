import { Navigator } from './navigator.js';

const navigator = new Navigator();

function setByClass(className) {
    let elements = document.getElementsByClassName(className);
    switch (className) {
        case 'checkbox':
            addListenerToAll(elements, 'click', (event) => {
                let checkbox = event.target;
                checkBoxToggle(checkbox);
            });
            break;
        case 'remove-button':
            addListenerToAll(elements, 'click', (event) => {
                let removeButton = event.target,
                    requestIndex = removeButton.dataset.removeIndex;
                removeTransportRequest(requestIndex);
                if (numCellsInTransportRequests() == 4) {
                    document.getElementById('flight-info').innerHTML = '';
                }
            });
            break;
        case 'next-button':
            addListenerToAll(elements, 'click', () => {
                let endConditions = {isEnd: false};
                if (!hasAtLeastOneAttending()) {
                    endConditions.isEnd = true;
                    endConditions.payload = {is_declined: true};
                }
                if (navigator.currentPage == 6) {
                    endConditions.isEnd = true;
                    endConditions.payload = 'fill later';
                }
                navigator.nextPage(endConditions);
            });
            break;
        case 'previous-button':
            addListenerToAll(elements, 'click', () => {
                navigator.previousPage();
            });
    }
}

function setById(id) {
    let element = document.getElementById(id);
    switch (id) {
        case 'select-all':
            element.addEventListener('click', () => {
                const checkboxes = document.querySelectorAll('[data-event]');
                for (const checkbox of checkboxes) {
                    checkbox.classList.add('checked');
                    checkbox.dataset.value = true;
                }
            });
            break;
        case 'clear-all':
            element.addEventListener('click', () => {
                const checkboxes = document.querySelectorAll('[data-event]');
                for (const checkbox of checkboxes) {
                    checkbox.classList.remove('checked');
                    checkbox.dataset.value = false;
                }
            });
            break;
        case 'add-button':
            element.addEventListener('click', () => {
                let numCells = numCellsInTransportRequests(),
                    requestIndex = numCells > 0 ? numCells / 4 - 1 : 0,
                    isMobile = window.matchMedia('(max-aspect-ratio: 1.2)').matches,
                    htmlToAppend = nunjucks.render('templates/partials/transport-request.html', {
                        transport_request_index: requestIndex,
                        is_mobile: isMobile
                    }),
                    base = document.getElementById('flight-info');

                base.innerHTML = base.innerHTML + htmlToAppend;
                setByClass('remove-button');
            });
            break;
    }
}

function addListenerToAll(collection, eventType, callable) {
    for (const item of collection) {
        item.addEventListener(eventType, callable);
    }
}

function checkBoxToggle(checkbox) {
    if (checkbox.classList.contains('checked')) {
        checkbox.classList.remove('checked');
        checkbox.dataset.value = 'false';
    } else {
        checkbox.classList.add('checked');
        checkbox.dataset.value = 'true';
    }
}

function removeTransportRequest(requestIndex) {
    let cellsToRemove = document.querySelectorAll(`[data-remove-index="${requestIndex}"]`);
    for (let cell of cellsToRemove) {
        cell.remove();
    }
}

function numCellsInTransportRequests() {
    return document.getElementById('flight-info').childElementCount;
}

function hasAtLeastOneAttending() {
    let isAttendingBoxes = document.querySelectorAll('[data-attribute="is_attending"]');
    for (const isAttendingBox of isAttendingBoxes) {
        if (isAttendingBox.dataset.value == 'true') {
            return true;
        }
    }
    return false;
}

export { setByClass, setById };