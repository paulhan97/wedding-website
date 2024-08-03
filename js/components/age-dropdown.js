import { ElementFromTag } from 'element';

class AgeDropDown extends ElementFromTag {
    constructor(name) {
        super('select');
        this.set('name', name);
        this.addClass('drop-down');
        this.addOption('21+');
        this.addOption('13-20');
        this.addOption('5-12');
        this.addOption('Under 5');
    }

    addOption(value) {
        let option = new ElementFromTag('option');
        option.set('value', value);
        option.setText(value);
        this.append(option);
    }

    select(value) {
        for (const option of this.getChildren()) {
            if (option.get('value') == value) {
                option.set('selected', '');
            }
        }
    }
}

export { AgeDropDown };