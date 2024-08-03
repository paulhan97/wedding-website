import { ElementFromTag, Element } from 'element';
import { CheckBoxWrapper } from 'wrappers';

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

class Label extends ElementFromTag {
    constructor(name, text) {
        super('label');
        this.set('for', name);
        this.setText(text);
    }
}

class EmptyRow extends ElementFromTag {
    constructor(size) {
        super('div');
        this.addClass(`empty-row-${size}`);
    }
}

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

class SelectColumn extends ElementFromTag {
    constructor(colNumber) {
        super('div');
        this.colNumber = colNumber;
        this.addClass('checkbox');
        this.setAllEvents();
    }

    setAllEvents() {
        this.setClickEvent();
        this.setMousoverEvent();
        this.setMousoutEvent();
    }

    setClickEvent() {
        this.on('click', () => {
            let isChecked = this.hasClass('checked');
            this.getCheckBoxes()
                .forEach(element => {
                    let checkbox = new CheckBoxWrapper(element);
                    if (isChecked) {
                        checkbox.uncheck();
                    } else {
                        checkbox.check();
                    }
                });

            if (isChecked) {
                this.uncheck();
            } else {
                this.check();
            }
        })
    }

    setMousoverEvent() {
        this.on('mouseover', () => {
            this.getCheckBoxes()
                .forEach(element => {
                    let checkbox = new Element(element);
                    checkbox.addClass('hover');
                });
        });
    }

    setMousoutEvent() {
        this.on('mouseout', () => {
            this.getCheckBoxes()
                .forEach(element => {
                    let checkbox = new Element(element);
                    checkbox.removeClass('hover');
                });
        });
    }

    check() {
        this.addClass('checked');
    }

    uncheck() {
        this.removeClass('checked');
    }

    getCheckBoxes() {
        return [...document.querySelectorAll(`.checkbox[data-col-number="${this.colNumber}"]`)];
    }
}

class Toggle extends ElementFromTag {
    constructor(name, checked) {
        super('div');
        this.addClass('toggle');

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

class InvisibleRow extends ElementFromTag {
    constructor(size) {
        super('div');
        this.addClass(`invisible-row-${size}`);
    }
}

class TextField extends ElementFromTag {
    constructor(name, value) {
        super('input');
        this.addClass('text-input');
        this.set('type', 'text');
        this.set('value', (value == null) ? '' : value);
        this.set('name', name);
    }
}

class AgeDropDown extends ElementFromTag {
    constructor(name) {
        super('select');
        this.set('name', name);
        this.addClass('drop-down');
        this.addOption('21+');
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

export {
    CheckBox,
    EmptyRow,
    SelectAllButton,
    Label,
    SelectColumn,
    Toggle,
    FlashMessage,
    InvisibleRow,
    TextField,
    StandardRadio,
    AgeDropDown
};
