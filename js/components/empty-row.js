import { ElementFromTag } from 'element';

class EmptyRow extends ElementFromTag {
    constructor(size) {
        super('div');
        this.addClass(`empty-row-${size}`);
    }
}

export { EmptyRow };