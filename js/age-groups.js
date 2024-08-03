import { Template, SheetsField } from 'base';
import { ElementFromTag } from 'element';
import { Label, FlashMessage, AgeDropDown } from 'components';

class AgeGroups extends Template {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);

        this.setProgressBar(4);
        this.setTitle('Please specify the age group of each person');
        this.whiteSpace[1] = 20;

        let grid = new ElementFromTag('div');
        grid.addClass('grid',
                      'two-auto-cols',
                      'center-aligned',
                      'column-gap-10',
                      'row-gap-10',
                      'text-align-left');
        this.subContainers[1] = grid;

        this.outline.push(
            {name: 'info', container: this.root},
            {name: 'ages', container: grid}
        );
    }

    get info() {
        let message = new FlashMessage('info', 'Providing us this information helps us determine seating arrangements, alcohol headcounts, kids meals, and any additional accommodations or resources for infants');
        return [message];
    }

    get ages() {
        let ages = [];
        for (const invitee of this.data) {
            let field = new SheetsField(invitee.fields[0]),
                labelContainer = new ElementFromTag('div'),
                label = new Label(field.cell, invitee.name),
                dropDown = new AgeDropDown(field.cell);
            dropDown.select(field.value);
            labelContainer.addClass('align-self-center');
            labelContainer.append(label);
            ages.push(labelContainer, dropDown);
        }
        return ages;
    }
}

export { AgeGroups };
