import { Template, SheetsField } from 'base';
import { ElementFromTag } from 'element';
import { SelectAllButton, CheckBox, SelectColumn, EmptyRow } from 'components';

class AttendanceByEvent extends Template {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);

        this.setProgressBar(1);
        this.setTitle('Please mark the event(s) that each person will be attending');

        let mediaQuery = window.matchMedia('(min-aspect-ratio: 1.2)');

        if (mediaQuery.matches) {
            this.whiteSpace[1] = 20;
            this.whiteSpace[4] = 20;

            let grid = new ElementFromTag('div');
            grid.addClass('grid',
                        'one-auto-col-plus-three-1fr-cols',
                        'center-aligned',
                        'column-gap-10',
                        'row-gap-10',
                        'text-align-center');
            this.subContainers[2] = grid;

            this.outline.push(
                {name: 'selectAll', container: this.root},
                {name: 'headings', container: grid},
                {name: 'selectColumn', container: grid},
                {name: 'namesAndCheckboxes', container: grid},
                {name: 'checkAllThatApply', container: this.root}
            );
        } else {
            this.whiteSpace[1] = 20;

            this.outline.push(
                {name: 'selectAll', container: this.root},
                {name: 'inviteeGrids', container: this.root}
            );
        }
    }

    get selectAll() {
        let selectAllButton = new SelectAllButton();
        return [selectAllButton];
    }

    get headings() {
        let emptyCell = new ElementFromTag('div'),
            welcomeDinner = this.createHeading('12/12/24', 'Welcome Dinner'),
            idolCountdown = this.createHeading('12/13/24', 'Idol Countdown'),
            ceremonyAndReception = this.createHeading('12/14/24', 'Ceremony \u0026 Reception');
        return [emptyCell, welcomeDinner, idolCountdown, ceremonyAndReception];
    }

    get selectColumn() {
        let moreThanOneInvitee = (this.data.length > 1),
            label = new ElementFromTag('div'),
            checkbox1 = this.createCenterJustifiedItem(new SelectColumn(0)),
            checkbox2 = this.createCenterJustifiedItem(new SelectColumn(1)),
            checkbox3 = this.createCenterJustifiedItem(new SelectColumn(2));
        
        label.addClass('text-dark-gray', 'thick', 'text-align-left');
        label.setText('\u0028select column\u0029');
        return moreThanOneInvitee ? [label, checkbox1, checkbox2, checkbox3] : [];
    }

    get namesAndCheckboxes() {
        let namesAndCheckboxes = [];
        for (const invitee of this.data) {
            let namePrinted = new ElementFromTag('div'),
            checkboxes = invitee.fields.map((cell, index) => {
                let field = new SheetsField(cell),
                    checkbox = new CheckBox(field.cell, field.checked);
                checkbox.set('data-col-number', index);
                return this.createCenterJustifiedItem(checkbox);
            });
            namePrinted.addClass('text-align-left');
            namePrinted.setText(invitee.name);
            namesAndCheckboxes.push(namePrinted, ...checkboxes);
        }
        return namesAndCheckboxes;
    }

    get checkAllThatApply() {
        let p = new ElementFromTag('p');
        p.setText('\u0028check all that apply\u0029');
        return [p];
    }

    get inviteeGrids() {
        let inviteeGrids = [],
            inviteeCount = 1
        for (const invitee of this.data) {
            let grid = new ElementFromTag('div'),
                nameCell = new ElementFromTag('div'),
                selectColumn = new SelectColumn(inviteeCount),
                selectColumnText = new ElementFromTag('div'),
                checkboxes = invitee.fields.map((cell) => {
                    let field = new SheetsField(cell),
                        checkbox = new CheckBox(field.cell, field.checked);
                    checkbox.set('data-col-number', inviteeCount);
                    return checkbox;
                }),
                event1 = new ElementFromTag('div'),
                event2 = new ElementFromTag('div'),
                event3 = new ElementFromTag('div');

            nameCell.setText(invitee.name);
            selectColumnText.setText('\u0028All events\u0029');
            event1.setText('12/12 - Welcome Dinner');
            event2.setText('12/13 - Idol Countdown');
            event3.setText('12/14 - Ceremony \u0026 Reception');

            grid.addClass(
                'grid',
                'two-auto-cols',
                'center-aligned',
                'column-gap-10',
                'row-gap-10'
            );
            nameCell.addClass('grid-column-span-2', 'thick');
            selectColumnText.addClass('text-align-left', 'align-self-center');
            event1.addClass('text-align-left', 'align-self-center');
            event2.addClass('text-align-left', 'align-self-center');
            event3.addClass('text-align-left', 'align-self-center');

            grid.append(
                nameCell,
                selectColumn,
                selectColumnText,
                checkboxes[0],
                event1,
                checkboxes[1],
                event2,
                checkboxes[2],
                event3
            );

            inviteeGrids.push(grid, new EmptyRow(30));
            inviteeCount++;
        }
        return inviteeGrids;
    }

    createHeading(eventDate, eventName) {
        let heading = new ElementFromTag('div'),
            eventDateP = new ElementFromTag('p'),
            eventNameP = new ElementFromTag('p');
        
        heading.addClass('thick');
        eventDateP.setText(eventDate);
        eventNameP.addClass('text-wrap-balance');
        eventNameP.setText(eventName);
        heading.append(eventDateP, eventNameP);
        return heading;
    }

    createCenterJustifiedItem(innerContents) {
        let container = new ElementFromTag('div');
        container.addClass('justify-self-center');
        container.append(innerContents);
        return container;
    }
}

export { AttendanceByEvent };
