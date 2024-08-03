import * as templates from 'templates';
import {
    TestRequest,
    sectionOneData,
    sectionTwoData,
    sectionThreeData,
    sectionFourData,
    sectionFiveData,
    sectionSixData,
    sectionSevenData,
    sectionEightData
} from './request.js';

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
        request: new TestRequest(sectionOneData),
        next: [
            {condition: allFalse, section: 'RSVP_DECLINED'},
            {condition: defaultCondition, section: 'ATTENDANCE_BY_EVENT'}
        ]
    },
    'ATTENDANCE_BY_EVENT': {
        template: templates.AttendanceByEvent,
        request: new TestRequest(sectionTwoData),
        next: [
            {condition: defaultCondition, section: 'AIRPORT_TRANSPORTATION'}
        ],
        previous: 'GENERAL_ATTENDANCE'
    },
    'AIRPORT_TRANSPORTATION': {
        template: templates.AirportTransport,
        request: new TestRequest(sectionThreeData),
        next: [
            {condition: allFalse, section: 'FOOD_ALLERGIES'},
            {condition: defaultCondition, section: 'BOOKED_FLIGHTS'}
        ],
        previous: 'ATTENDANCE_BY_EVENT'
    },
    'BOOKED_FLIGHTS': {
        template: templates.BookedFlights,
        request: new TestRequest(sectionFourData),
        next: [
            {condition: allFalse, section: 'FOOD_ALLERGIES'},
            {condition: defaultCondition, section: 'FLIGHT_INFORMATION'}
        ],
        previous: 'AIRPORT_TRANSPORTATION'
    },
    'FLIGHT_INFORMATION': {
        template: templates.FlightInformation,
        request: new TestRequest(sectionFiveData),
        next: [
            {condition: defaultCondition, section: 'FOOD_ALLERGIES'}
        ],
        previous: 'BOOKED_FLIGHTS'
    },
    'FOOD_ALLERGIES': {
        template: templates.FoodAllergies,
        request: new TestRequest(sectionSixData),
        next: [
            {condition: defaultCondition, section: 'AGE_GROUPS'}
        ],
        previous: 'AIRPORT_TRANSPORTATION'
    },
    'AGE_GROUPS': {
        template: templates.AgeGroups,
        request: new TestRequest(sectionSevenData),
        next: [
            {condition: defaultCondition, section: 'WHATSAPP'}
        ],
        previous: 'FOOD_ALLERGIES'
    },
    'WHATSAPP': {
        template: templates.WhatsApp,
        request: new TestRequest(sectionEightData),
        next: [
            {condition: defaultCondition, section: 'RSVP_FINISHED'}
        ],
        previous: 'AGE_GROUPS'
    }
};

export { Router };
