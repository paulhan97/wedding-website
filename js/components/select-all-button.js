import { ElementFromTag } from 'element';
import { CheckBoxWrapper } from 'wrappers';

class SelectAllButton extends ElementFromTag {
    constructor() {
        super('button');
        this.addClass('button', 'font-size-12', 'thick');
        this.setText('SELECT ALL');
        this.selectAll = true;
        this.setClickEvent();
    }

    setClickEvent() {
        this.on('click', (event) => {
            event.preventDefault();
            let checkboxes = document.querySelectorAll('.checkbox');
            for (const baseElement of checkboxes) {
                let checkbox = new CheckBoxWrapper(baseElement);
                if (this.selectAll) { checkbox.check() }
                else { checkbox.uncheck() }
            }
            this.toggle();
        });
    }

    toggle() {
        if (this.selectAll) {
            this.setText('CLEAR ALL');
            this.selectAll = false;
        } else {
            this.setText('SELECT ALL');
            this.selectAll = true;
        }
    }
}

export { SelectAllButton };