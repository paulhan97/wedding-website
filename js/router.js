import * as templates from 'templates';
import { GetFormData } from 'request';

function allFalse() {
    let form = document.getElementById('form'),
        formData = new FormData(form);

    for (const value of formData.values()) {
        if (value == 'TRUE') {
            return false;
        }
    }

    return true;
}

function defaultCondition() {
    return true;
}

const Router = {
    'GENERAL_ATTENDANCE': {
        template: templates.CheckListWithName,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:D{end_row}',
                                 'D'),
        next: [
            {condition: allFalse, section: 'RSVP_DECLINED'},
            {condition: defaultCondition, section: 'ATTENDANCE_BY_EVENT'}
        ]
    },
    'ATTENDANCE_BY_EVENT': {
        template: templates.AttendanceByEvent,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:G{end_row}',
                                 'DEFG'),
        next: [
            {condition: defaultCondition, section: 'AIRPORT_TRANSPORTATION'}
        ],
        previous: 'GENERAL_ATTENDANCE'
    },
    'AIRPORT_TRANSPORTATION': {
        template: templates.AirportTransport,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:D{end_row},H{start_row}:H{end_row}',
                                 'DH'),
        next: [
            {condition: allFalse, section: 'FOOD_ALLERGIES'},
            {condition: defaultCondition, section: 'BOOKED_FLIGHTS'}
        ],
        previous: 'ATTENDANCE_BY_EVENT'
    },
    'BOOKED_FLIGHTS': {
        template: templates.BookedFlights,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:D{end_row},I{start_row}:I{end_row}',
                                 'DI'),
        next: [
            {condition: allFalse, section: 'FOOD_ALLERGIES'},
            {condition: defaultCondition, section: 'FLIGHT_INFORMATION'}
        ],
        previous: 'AIRPORT_TRANSPORTATION'
    },
    'FLIGHT_INFORMATION': {
        template: templates.FlightInformation,
        request: new GetFormData('B{start_row}:B{end_row},I{start_row}:M{end_row}',
                                 'IJKLM'),
        next: [
            {condition: defaultCondition, section: 'FOOD_ALLERGIES'}
        ],
        previous: 'BOOKED_FLIGHTS'
    },
    'FOOD_ALLERGIES': {
        template: templates.FoodAllergies,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:D{end_row},N{start_row}:N{end_row}',
                                 'DN'),
        next: [
            {condition: defaultCondition, section: 'AGE_GROUPS'}
        ],
        previous: 'AIRPORT_TRANSPORTATION'
    },
    'AGE_GROUPS': {
        template: templates.AgeGroups,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:D{end_row},O{start_row}:O{end_row}',
                                 'DO'),
        next: [
            {condition: defaultCondition, section: 'WHATSAPP'}
        ],
        previous: 'FOOD_ALLERGIES'
    },
    'WHATSAPP': {
        template: templates.WhatsApp,
        request: new GetFormData('B{start_row}:B{end_row},D{start_row}:D{end_row},P{start_row}:P{end_row}',
                                 'DP'),
        next: [
            {condition: defaultCondition, section: 'RSVP_FINISHED'}
        ],
        previous: 'AGE_GROUPS'
    }
};

export { Router };
