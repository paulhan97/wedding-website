import { Element } from 'element';

class CheckBoxWrapper extends Element {
    constructor(element) {
        super(element);
    }

    check() {
        if (this.firstChild.element !== null) {
            this.firstChild.set('checked', '');
            this.lastChild.remove('checked');
        }
        this.addClass('checked');
    }

    uncheck() {
        if (this.firstChild.element !== null) {
            this.firstChild.remove('checked');
            this.lastChild.set('checked', '');
        }
        this.removeClass('checked');
    }
}

export { CheckBoxWrapper }
