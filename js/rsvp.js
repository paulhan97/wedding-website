import { DataManager } from './data-manager.js';
import { Request } from './request.js';
import * as events from './events.js';

const params = new URLSearchParams(document.location.search),
    inviteId = params.get('i');

document.addEventListener('DOMContentLoaded', () => {
    let request = new Request('GET', {'Content-Type': 'application/json'}, `get_rsvp_data?invite_id=${inviteId}`);
    request.responseBody.then(data => {
        let dataManager = new DataManager(data),
        isMobile = window.matchMedia('(max-aspect-ratio: 1.2)').matches;

        const generalAttendance = document.getElementById('general-attendance');
        generalAttendance.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 0,
            prompt: 'Please identify everyone who will be attending',
            rsvp_section: 'checklist',
            data: dataManager.getDataForSectionByName('GENERAL_ATTENDANCE'),
            attribute: 'is_attending'
        });
        const eventAttendance = document.getElementById('event-attendance');
        eventAttendance.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 1,
            prompt: 'Please identify the days each person will be present',
            rsvp_section: 'event-attendance',
            data: dataManager.getDataForSectionByName('EVENT_ATTENDANCE'),
            attribute: 'event_attendance',
            is_mobile: isMobile
        });
        const transportRequests = document.getElementById('transport-requests');
        transportRequests.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 2,
            prompt: 'Would anyone from your party like transportation?',
            rsvp_section: 'transport-requests',
            data: dataManager.getDataForSectionByName('TRANSPORT_REQUESTS'),
            attribute: 'event_attendance',
            is_mobile: isMobile
        });
        const foodAllergies = document.getElementById('food-allergies');
        foodAllergies.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 3,
            prompt: 'Please list all food allergies for anyone in your party',
            rsvp_section: 'single-textarea',
            data: dataManager.getDataForSectionByName('FOOD_ALLERGIES'),
            textarea_id: 'food-allergies-input'
        });
        const ageGroups = document.getElementById('age-groups');
        ageGroups.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 4,
            prompt: 'Please identify the age group of each person',
            rsvp_section: 'age-groups',
            data: dataManager.getDataForSectionByName('AGE_GROUPS')
        });
        const whatsApp = document.getElementById('whatsapp');
        whatsApp.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 5,
            prompt: 'Could you provide a phone number for wedding updates? (highly recommended)',
            rsvp_section: 'whatsapp',
            data: dataManager.getDataForSectionByName('WHATSAPP')
        });
        const songRequests = document.getElementById('song-requests');
        songRequests.innerHTML = nunjucks.render('templates/rsvp.html', {
            num_sections_completed: 6,
            prompt: 'Do you have any song suggestions?',
            rsvp_section: 'single-textarea',
            data: dataManager.getDataForSectionByName('SONG_REQUESTS'),
            textarea_id: 'song-requests-input'
        });
        events.setByClass('checkbox');
        events.setByClass('remove-button');
        events.setById('select-all');
        events.setById('clear-all');
        events.setById('add-button');
        events.setByClass('next-button');
        events.setByClass('previous-button');


        let phoneNumberInputs = document.querySelectorAll('.international-phone-number');
        for (let phoneNumberInput of phoneNumberInputs) {
            window.intlTelInput(phoneNumberInput, {
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.12/build/js/utils.js",
                countryOrder: ["us"],
                initialCountry: "us"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
});