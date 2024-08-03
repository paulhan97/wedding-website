import { ElementFromTag } from 'element';

class TextField extends ElementFromTag {
    constructor(name, value) {
        super('input');
        this.addClass('text-input');
        this.set('type', 'text');
        this.set('value', (value == null) ? '' : value);
        this.set('name', name);
    }
}

export { TextField };