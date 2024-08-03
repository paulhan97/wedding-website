const sectionOneData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'FALSE'}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'}
        ]
    }
],
sectionTwoData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'TRUE'},
            {cell: 'E2', value: 'FALSE'},
            {cell: 'F2', value: 'FALSE'},
            {cell: 'G2', value: 'FALSE'}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'},
            {cell: 'E3', value: 'FALSE'},
            {cell: 'F3', value: 'FALSE'},
            {cell: 'G3', value: 'FALSE'}
        ]
    }
],
sectionThreeData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'TRUE'},
            {cell: 'H2', value: 'FALSE'}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'},
            {cell: 'H3', value: 'TRUE'}
        ]
    }
],
sectionFourData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'TRUE'},
            {cell: 'I2', value: 'FALSE'}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'},
            {cell: 'I3', value: 'TRUE'}
        ]
    }
],
sectionFiveData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'I2', value: 'TRUE'},
            {cell: 'J2', value: 'FALSE'},
            {cell: 'K2', value: null},
            {cell: 'L2', value: null},
            {cell: 'M2', value: null}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'I3', value: 'TRUE'},
            {cell: 'J3', value: 'FALSE'},
            {cell: 'K3', value: 'Arrival Only'},
            {cell: 'L3', value: null},
            {cell: 'M3', value: null}
        ]
    }
],
sectionSixData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'TRUE'},
            {cell: 'N2', value: ''}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'},
            {cell: 'N3', value: 'Peanuts'}
        ]
    }
],
sectionSevenData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'TRUE'},
            {cell: 'O2', value: ''}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'},
            {cell: 'O3', value: '5-12'}
        ]
    }
],
sectionEightData = [
    {
        name: 'Kimia Sadeghi',
        fields: [
            {cell: 'D2', value: 'TRUE'},
            {cell: 'P2', value: ''}
        ]
    },
    {
        name: 'Paul Han',
        fields: [
            {cell: 'D3', value: 'TRUE'},
            {cell: 'P3', value: '+12679848681'}
        ]
    }
];

class TestRequest {
    constructor(data) {
        this.data = data
    }

    get responseBody() {
        return new Promise((resolve, reject) => {
            resolve(this.data);
        });
    }
}

export {
    TestRequest,
    sectionOneData,
    sectionTwoData,
    sectionThreeData,
    sectionFourData,
    sectionFiveData,
    sectionSixData,
    sectionSevenData,
    sectionEightData
};
