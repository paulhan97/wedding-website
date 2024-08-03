import { ElementFromTag } from 'element';

class Radio extends ElementFromTag {
    constructor(name, value) {
        super('input');
        this.set('type', 'radio');
        this.set('name', name);
        this.set('value', value);
    }
}

class StandardRadio extends Radio {
    constructor(name, value) {
        super(name, value);
        this.addClass('radio');
    }

    get value() {
        return this.get('value');
    }
}

export {
    Radio,
    StandardRadio
};