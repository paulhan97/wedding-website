import { ElementFromTag } from 'element';
import { Radio } from './radio.js';

class CheckBox extends ElementFromTag {
    constructor(name, checked) {
        super('div');
        this.addClass('checkbox');

        this.append(new Radio(name, 'TRUE'),
                    new Radio(name, 'FALSE'));

        if (checked) {
            this.check();
        } else {
            this.uncheck();
        }

        this.setClickEvent();
    }

    check() {
        this.firstChild.set('checked', '');
        this.lastChild.remove('checked');
        this.addClass('checked');
    }

    uncheck() {
        this.firstChild.remove('checked');
        this.lastChild.set('checked', '');
        this.removeClass('checked');
    }

    setClickEvent() {
        this.on('click', () => {
            if (this.hasClass('checked')) {
                this.uncheck();
            } else {
                this.check();
            }
        });
    }
}

export { CheckBox };