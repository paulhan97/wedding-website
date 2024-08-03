import { ElementFromTag } from 'element';

class FlashMessage extends ElementFromTag {
    constructor(type, message) {
        super('div');
        this.addClass('flex', 'column-gap-10', 'flash-message', type);
        let icon = new ElementFromTag('div'),
            text = new ElementFromTag('p'),
            iconMapping = {
                info: '\uD83D\uDEC8'
            };
        icon.addClass('align-self-center', 'font-size-20');
        text.addClass('text-align-left');
        icon.setText(iconMapping[type]);
        text.setText(message);
        this.append(icon, text);
    }
}

export { FlashMessage };