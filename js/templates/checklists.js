import { Template, SheetsField } from 'base';
import { ElementFromTag } from 'element';
import { CheckBox, Label, SelectColumn, EmptyRow } from 'components';

class CheckListWithName extends Template {
    constructor(progressBar, title, root, data) {
        super(progressBar, title, root, data);

        this.setProgressBar(0);
        this.setTitle('Please identify everyone who will be attending');
        this.whiteSpace[1] = 10;

        let grid = new ElementFromTag('div');
        grid.addClass('grid',
                      'two-auto-cols',
                      'center-aligned',
                      'column-gap-10',
                      'row-gap-10',
                      'text-align-left');
        this.subContainers[1] = grid;

        this.outline.push(
            {name: 'checkAllThatApply', container: this.root},
            {name: 'checkList', container: grid}
        );
    }

    get checkAllThatApply() {
        let p = new ElementFromTag('p');
        p.setText('\u0028check all who apply\u0029');
        return [p];
    }

    get checkList() {
        let selectAllText = new ElementFromTag('p'),
            checkList = [
            new SelectColumn(0),
            selectAllText
        ];

        selectAllText.setText('\u0028select all\u0029');

        for (const invitee of this.data) {
            let field = new SheetsField(invitee.fields[0]),
                checkbox = new CheckBox(field.cell, field.checked),
                label = new Label(field.cell, invitee.name);
                
            checkbox.set('data-col-number', 0);
            checkList.push(checkbox, label);
        }
        return checkList;
    }
}

class AirportTransport extends CheckListWithName {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);
        this.setProgressBar(2);
        this.setTitle('Would anyone like transportation to or from the airport?');
        this.whiteSpace[1] = 10;
        this.whiteSpace[2] = 30;
        this.outline.push({name: 'disclaimers', container: this.root},)
    }

    get disclaimers() {
        let container = new ElementFromTag('div'),
            arrivalDisclaimer = this.singleLineDisclaimer('\u2731 For arrivals, transportation from KOA to Mauna Lani will only be provided on Wednesday, December 11 and Thursday, December 12'),
            departureDisclaimer = this.singleLineDisclaimer('\u2731 For departures, transportation from Mauna Lani to KOA will only be provided on Sunday, December 15');
        container.addClass('text-align-left', 'side-padding-50');
        container.append(arrivalDisclaimer, new EmptyRow(10), departureDisclaimer)
        return [container];
    }

    singleLineDisclaimer(text) {
        let outer = new ElementFromTag('p'),
            inner = new ElementFromTag('small');
        inner.setText(text);
        inner.addClass('disclaimer');
        outer.append(inner);
        return outer;
    }
}

class BookedFlights extends CheckListWithName {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);
        this.setProgressBar(2);
        this.setTitle('Has anyone already booked flights?');
    }
}

export { CheckListWithName, AirportTransport, BookedFlights };
