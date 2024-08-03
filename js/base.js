import { Element } from 'element';
import { EmptyRow } from 'components';

class SheetsField {
    constructor(member) {
        this.cell = member['cell'];
        this.value = member['value'];
    }

    get column() {
        return this.cell.slice(0, 1);
    }

    get checked() {
        return this.value == 'TRUE';
    }
}

class Template {
    constructor(progressBar, title, root, data) {
        this.progressBar = progressBar;
        this.title = title;
        this.root = root;
        this.data = data;
        this.outline = [];
        this.subContainers = {};
        this.whiteSpace = {};
    }

    setProgressBar(stepNumber) {
        let counter = 0;
        for (const increment of this.progressBar.getChildren()) {
            if (counter < stepNumber) {
                increment.addClass('bg-gold');
                increment.removeClass('bg-gray');
            } else {
                increment.addClass('bg-gray');
                increment.removeClass('bg-gold');
            }
            counter++;
        }
    }

    setTitle(title) {
        this.title.setText(title);
    }

    build() {
        for (let i = 0; i < this.outline.length; i++) {
            if (i in this.whiteSpace) {
                this.root.append(new EmptyRow(this.whiteSpace[i]));
            }
            if (i in this.subContainers) {
                this.root.append(this.subContainers[i]);
            }
            let item = this.outline[i];
            item.container.append(...this[item.name]);
        }
    }

    getElementsByData(attribute, value) {
        let baseElements = [...document.querySelectorAll(`[data-${attribute}=${value}]`)],
            wrapped = baseElements.map(element => new Element(element));
        return wrapped;
    }
}

export { SheetsField, Template };