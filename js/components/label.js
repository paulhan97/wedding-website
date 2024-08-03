import { ElementFromTag } from 'element';

class Label extends ElementFromTag {
    constructor(name, text) {
        super('label');
        this.set('for', name);
        this.setText(text);
    }
}

export { Label };