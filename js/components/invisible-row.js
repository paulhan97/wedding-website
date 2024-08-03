import { ElementFromTag } from 'element';

class InvisibleRow extends ElementFromTag {
    constructor(size) {
        super('div');
        this.addClass(`invisible-row-${size}`);
    }
}

export { InvisibleRow };