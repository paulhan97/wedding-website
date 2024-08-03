import { Template, SheetsField } from 'base';
import { ElementFromTag } from 'element';
import { Label, TextField } from 'components';

class FoodAllergies extends Template {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);

        this.setProgressBar(3);
        this.setTitle('Does anyone in your party have any food allergies? if so, please detail below');

        let grid = new ElementFromTag('div');
        grid.addClass('grid',
                      'one-auto-col-plus-one-1fr-col',
                      'center-aligned',
                      'column-gap-10',
                      'row-gap-10',
                      'text-align-left',
                      'side-padding-50');
        this.subContainers[0] = grid;

        this.outline.push(
            {name: 'foodAllergies', container: grid}
        );
    }

    get foodAllergies() {
        let foodAllergies = [];
        for (const invitee of this.data) {
            let field = new SheetsField(invitee.fields[0]),
                labelContainer = new ElementFromTag('div'),
                label = new Label(field.cell, invitee.name),
                textField = new TextField(field.cell, field.value);
            labelContainer.addClass('align-self-center');
            labelContainer.append(label);
            foodAllergies.push(labelContainer, textField);
        }
        return foodAllergies;
    }
}

export { FoodAllergies };
