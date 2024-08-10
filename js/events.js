import { Navigator } from './navigator.js';

const navigator = new Navigator();
const params = new URLSearchParams(document.location.search);
const inviteId = params.get('i');

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
                reindexTransportRequests();
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
                    endConditions.payload = getFinalPayload();
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

function reindexTransportRequests() {
    let removeIndexFields = document.querySelectorAll(`[data-remove-index]`),
        transportIndexFields = document.querySelectorAll(`[data-transport-index]`),
        allIndexFields = [...removeIndexFields].concat([...transportIndexFields]),
        allIndices = [];
    
    for (let indexField of allIndexFields) {
        if ('removeIndex' in indexField.dataset) {
            allIndices.push(indexField.dataset.removeIndex);
        }
        if ('transportIndex' in indexField.dataset) {
            allIndices.push(indexField.dataset.transportIndex);
        }
    }

    let dedup = [...new Set(allIndices)];

    for (let indexField of allIndexFields) {
        if ('removeIndex' in indexField.dataset) {
            indexField.dataset.removeIndex = dedup.indexOf(indexField.dataset.removeIndex);
        }
        if ('transportIndex' in indexField.dataset) {
            indexField.dataset.transportIndex = dedup.indexOf(indexField.dataset.transportIndex);
        }
    }
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

function getFinalPayload() {
    let invitees_dict = {};
    invitees_dict = addIsAttending(invitees_dict);
    invitees_dict = addEventsObject(invitees_dict);
    invitees_dict = addAgeGroupAndPhoneNumber(invitees_dict);
    let rsvp_dict = flattenInviteesDict(invitees_dict);
    rsvp_dict['invite_id'] = inviteId;
    rsvp_dict['transport_requests'] = getAllTransportRequests();
    rsvp_dict['food_allergies'] = getTextAreaValue('food-allergies-input');
    rsvp_dict['song_requests'] = getTextAreaValue('song-requests-input');
    return rsvp_dict;
}

function addIsAttending(dict) {
    let isAttendingBoxes = document.querySelectorAll('[data-attribute="is_attending"]');

    for (const isAttendingBox of isAttendingBoxes) {
        dict[isAttendingBox.dataset.invitee] = {
            'is_attending': (isAttendingBox.dataset.value === 'true')
        };
    }

    return dict;
}

function addEventsObject(dict) {
    let eventBoxes = document.querySelectorAll('[data-event]');

    for (const eventBox of eventBoxes) {
        if (!('event_attendance' in dict[eventBox.dataset.invitee])) {
            dict[eventBox.dataset.invitee]['event_attendance'] = {};
        }
        dict[eventBox.dataset.invitee]['event_attendance'][eventBox.dataset.event] = (eventBox.dataset.value === 'true');
    }

    return dict;
}

function addAgeGroupAndPhoneNumber(dict) {
    let ageGroupSelects = document.querySelectorAll('[data-attribute="age_group"]'),
        phoneNumberSelects = document.querySelectorAll('[data-attribute="phone_number"]');

    for (let i=0; i < ageGroupSelects.length; i++) {
        let ags = ageGroupSelects[i],
            pns = phoneNumberSelects[i];
        dict[ags.dataset.invitee]['age_group'] = ags.value;
        dict[pns.dataset.invitee]['phone_number'] = pns.value;
    }

    return dict;
}

function flattenInviteesDict(dict) {
    let newDict = {'invitees': []};
    for (let [inviteeName, invitee] of Object.entries(dict)) {
        invitee['name'] = inviteeName;
        newDict['invitees'].push(invitee);
    }
    return newDict;
}

function getAllTransportRequests() {
    let transportRequestFields = document.querySelectorAll('[data-transport-attribute]');
    if (transportRequestFields.length > 0) {
        let transportRequests = {}
        for (let trs of transportRequestFields) {
            let index = trs.dataset.transportIndex,
                attribute = trs.dataset.transportAttribute,
                value = (attribute == 'num_passengers') ? parseInt(trs.value) : trs.value;
            if (!(index in transportRequests)) {
                transportRequests[index] = {};
            }
            transportRequests[index][attribute] = value;
        }
        let asList = [];
        for (let index in transportRequests) {
            asList[index] = transportRequests[index];
        }
        return asList;
    }
    return [];
}

function getTextAreaValue(textAreaId) {
    return document.getElementById(textAreaId).value;
}

export { setByClass, setById };