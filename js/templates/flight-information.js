import { Template, SheetsField } from 'base';
import { ElementFromId, ElementFromTag } from 'element';
import { Toggle, Label, FlashMessage, InvisibleRow, StandardRadio, TextField, EmptyRow } from 'components';

class FlightInformation extends Template {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);

        this.setProgressBar(2);
        this.setTitle('Please provide your flight information');

        this.whiteSpace[1] = 20;

        let grid = new ElementFromTag('div');
        grid.addClass(
            'grid',
            'center-aligned',
            'column-gap-30'
        );
        this.subContainers[1] = grid;

        let mediaQuery = window.matchMedia('(min-aspect-ratio: 1.2)');

        if (mediaQuery.matches) {
            grid.addClass('two-auto-cols-plus-two-1fr-cols', 'row-gap-10');

            this.outline.push(
                {name: 'toggle', container: this.root},
                {name: 'headings', container: grid},
                {name: 'options', container: grid}
            );
        } else {
            grid.addClass('one-auto-col-plus-one-1fr-col', 'row-gap-20');

            this.outline.push(
                {name: 'toggle', container: this.root},
                {name: 'mobileOptions', container: grid}
            );
        }
    }

    build() {
        super.build();
        this.setInitialDisabled();
    }

    get toggle() {
        let toggleField = new SheetsField(this.data[0].fields[0]),
            container = new ElementFromTag('div'),
            toggleButton = new Toggle(toggleField.cell, toggleField.checked),
            label = new Label(this.data[0].fields[0].cell,
                              'Members of the party are taking different flights');

        toggleButton.set('id', 'toggle');
        toggleButton.on('click', () => {
            this.toggleOptions();
        });
        container.addClass('flex', 'center-aligned', 'column-gap-5');
        label.addClass('align-self-center');
        container.append(toggleButton, label);

        return [container];
    }

    get headings() {
        let emptyCell1 = new ElementFromTag('div'),
            emptyCell2 = new ElementFromTag('div'),
            containerForPadding1 = new ElementFromTag('div'),
            arrivalMessage = new FlashMessage('info', 'Please enter the flight number for your last leg arriving at KOA'),
            containerForPadding2 = new ElementFromTag('div'),
            departureMessage = new FlashMessage('info', 'Please enter the flight number for your first leg departing from KOA'),
            padding = new InvisibleRow(10),
            heading1 = new ElementFromTag('div'),
            heading2 = new ElementFromTag('div'),
            heading3 = new ElementFromTag('div'),
            heading4 = new ElementFromTag('div');

            containerForPadding1.append(arrivalMessage);
            containerForPadding2.append(departureMessage, padding);
            heading1.addClass('thick', 'text-align-left');
            heading2.addClass('thick', 'text-align-left');
            heading3.addClass('thick');
            heading4.addClass('thick');

            heading1.setText('Passenger\u0028s\u0029');
            heading2.setText('Transport Options');
            heading3.setText('Arrival to KOA');
            heading4.setText('Departure from KOA');

        return [emptyCell1, emptyCell2, containerForPadding1, containerForPadding2, heading1, heading2, heading3, heading4];
    }

    get options() {
        return [...this.loadSingleOption(), ...this.loadAllOptions()];
    }

    get mobileOptions() {
        let totalOptions = [],
            singleOptions = this.loadSingleOption(),
            allOptions = this.loadAllOptions(),
            heading1 = new ElementFromTag('div'),
            heading2 = new ElementFromTag('div'),
            heading3 = new ElementFromTag('div'),
            heading4 = new ElementFromTag('div');

        singleOptions.forEach(cell => {
            cell.addClass('text-align-left');
        });

        allOptions.forEach(cell => {
            cell.addClass('text-align-left');
        });
            
        heading1.addClass('thick', 'align-self-center', 'text-align-right');
        heading2.addClass('thick', 'align-self-center', 'text-align-right');
        heading3.addClass('thick', 'align-self-center', 'text-align-right');
        heading4.addClass('thick', 'align-self-center', 'text-align-right');
        
        heading1.setText('Passenger\u0028s\u0029');
        heading2.setText('Transport Options');
        heading3.setText('Arrival to KOA');
        heading4.setText('Departure from KOA');

        heading1.setData('toggle', 'single-option');
        heading2.setData('toggle', 'single-option');
        heading3.setData('toggle', 'single-option');
        heading4.setData('toggle', 'single-option');

        totalOptions.push(
            heading1,
            singleOptions[0],
            heading2,
            singleOptions[1],
            heading3,
            singleOptions[2],
            heading4,
            singleOptions[3]
        );

        for (let i=0; i<this.data.length; i++) {
            let headingOne = new ElementFromTag('div'),
                headingTwo = new ElementFromTag('div'),
                headingThree = new ElementFromTag('div'),
                headingFour = new ElementFromTag('div');

            headingOne.addClass('thick', 'align-self-center', 'text-align-right');
            headingTwo.addClass('thick', 'align-self-center', 'text-align-right');
            headingThree.addClass('thick', 'align-self-center', 'text-align-right');
            headingFour.addClass('thick', 'align-self-center', 'text-align-right');

            headingOne.setText('Passenger');
            headingTwo.setText('Transport Options');
            headingThree.setText('Arrival to KOA');
            headingFour.setText('Departure from KOA');

            headingOne.setData('toggle', 'all-options');
            headingTwo.setData('toggle', 'all-options');
            headingThree.setData('toggle', 'all-options');
            headingFour.setData('toggle', 'all-options');

            totalOptions.push(
                headingOne,
                allOptions[i*4],
                headingTwo,
                allOptions[i*4+1],
                headingThree,
                allOptions[i*4+2],
                headingFour,
                allOptions[i*4+3],
            );
        }

        return totalOptions;
    }

    loadSingleOption() {
        let options = [],
            first_invitee = this.data[0],
            namesCell = new ElementFromTag('div'),
            names = this.data.map(invitee => invitee.name);
        
        names.forEach(name => {
            let p = new ElementFromTag('p');
            p.setText(name);
            namesCell.append(p);
        });
        namesCell.addClass('align-self-center');
        options.push(namesCell);

        first_invitee.fields.forEach((item, index) => {
            if (index > 0) {
                let field = new SheetsField(item);
                switch(field.column) {
                    case 'K':
                        let value = (field.value == null) ? 'Both' : field.value,
                            transportOptions = this.transportOptions(field.cell, value);

                        options.push(transportOptions);
                        break;
                    case 'L':
                    case 'M':
                        options.push(this.textFieldWithLabel(field.cell, field.value));
                }
            }
        });

        options.forEach((element) => {
            element.setData('toggle', 'single-option');
        });

        return options;
    }

    loadAllOptions() {
        let allOptions = [];
        for (const invitee of this.data) {
            let nameCell = new ElementFromTag('div');
            nameCell.setText(invitee.name);
            nameCell.addClass('text-align-left', 'align-self-center');
            allOptions.push(nameCell);
            invitee.fields.forEach((item, index) => {
                if (index > 0) {
                    let field = new SheetsField(item);
                    switch(field.column) {
                        case 'K':
                            let value = (field.value == null) ? 'Both' : field.value,
                                transportOptions = this.transportOptions(field.cell, value);

                            allOptions.push(transportOptions);
                            break;
                        case 'L':
                        case 'M':
                            allOptions.push(this.textFieldWithLabel(field.cell, field.value));
                    }
                }
            });
        }

        allOptions.forEach((element) => {
            element.setData('toggle', 'all-options');
        });

        return allOptions;
    }

    transportOptions(name, value) {
        let container = new ElementFromTag('div'),
            radio1 = new StandardRadio(name, 'Arrival Only'),
            radio2 = new StandardRadio(name, 'Departure Only'),
            radio3 = new StandardRadio(name, 'Both'),
            label1 = new Label(name, 'Arrival Only'),
            label2 = new Label(name, 'Departure Only'),
            label3 = new Label(name, 'Both'),
            inner1 = new ElementFromTag('div'),
            inner2 = new ElementFromTag('div'),
            inner3 = new ElementFromTag('div');

        container.addClass('text-align-left', 'align-self-center');
        inner1.append(radio1, label1);
        inner2.append(radio2, label2);
        inner3.append(radio3, label3);
        container.append(inner1, inner2, inner3);
        return container;
    }

    textFieldWithLabel(name, value) {
        let container = new ElementFromTag('div'),
            inner = new ElementFromTag('div'),
            label = new Label(name, 'Flight No.'),
            space = new ElementFromTag('div'),
            textField = new TextField(name, value);

        container.addClass('align-self-center');
        space.addClass('inline', 'empty-column-10');
        inner.append(label, space, textField)
        container.append(inner);
        return container;
    }

    get hasSeparateFlights() {
        let toggle = new ElementFromId('toggle');
        return toggle.hasClass('checked');
    }

    setInitialDisabled() {
        if (this.hasSeparateFlights) {
            this.hideOptions('single-option');
        } else {
            this.hideOptions('all-options');
        }
        this.setCheckedRadio();
    }

    hideOptions(toggleValue) {
        this.getElementsByData('toggle', toggleValue).forEach(element => {
            let inputs = element.select('input')
            if (inputs.length > 0) {
                inputs.forEach((descendant) => {
                    descendant.set('disabled', '');
                    descendant.remove('checked');
                });
            }
            element.hide();
        });
    }

    showOptions(toggleValue) {
        this.getElementsByData('toggle', toggleValue).forEach(element => {
            let inputs = element.select('input')
            if (inputs.length > 0) {
                inputs.forEach((descendant) => {
                    descendant.set('checked', '');
                    descendant.remove('disabled');
                });
            }
            element.show();
        });
    }

    setCheckedRadio() {
        let selectedTransportOptions = [];
        if (this.hasSeparateFlights) {
            for (const invitee of this.data) {
                selectedTransportOptions.push(new SheetsField(invitee.fields[1]));
            }
        } else {
            selectedTransportOptions.push(new SheetsField(this.data[0].fields[1]));
        }
        
        selectedTransportOptions.forEach(field => {
            let value = (field.value == null) ? 'Both' : field.value,
                toCheck = this.root.select(`input[name="${field.cell}"][value="${value}"]:not([disabled])`)[0];
            toCheck.set('checked', '');
        });
    }

    toggleOptions() {
        if (this.hasSeparateFlights) {
            this.hideOptions('single-option');
            this.showOptions('all-options');
        } else {
            this.hideOptions('all-options');
            this.showOptions('single-option');
        }
        this.setCheckedRadio();
    }
}

export { FlightInformation };
