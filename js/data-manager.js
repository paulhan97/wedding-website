class DataManager {
    constructor(initialState) {
        this.data = initialState
    }

    getDataForSectionByName(sectionName) {
        switch (sectionName) {
            case 'GENERAL_ATTENDANCE':
                return this.getNameWithAttribute('is_attending');
                break;
            case 'EVENT_ATTENDANCE':
                return this.getNameWithAttribute('event_attendance');
                break;
            case 'TRANSPORT_REQUESTS':
                return this.data['transport_requests'];
                break;
            case 'FOOD_ALLERGIES':
                return this.data['food_allergies'];
                break;
            case 'AGE_GROUPS':
                return this.getNameWithAttribute('age_group');
                break;
            case 'WHATSAPP':
                return this.getNameWithAttribute('phone_number');
                break;
            case 'SONG_REQUESTS':
                return this.data['song_requests'];
                break;
        }
    }

    getNameWithAttribute(attribute) {
        let nameWithAttribute = {}
        for (const invitee of this.data.invitees) {
            nameWithAttribute[invitee.name] = invitee[attribute];
        }
        return nameWithAttribute;
    }
}

export { DataManager };