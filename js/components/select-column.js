import { ElementFromTag, Element } from 'element';
import { CheckBoxWrapper } from 'wrappers';

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

export { SelectColumn };