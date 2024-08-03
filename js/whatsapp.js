import { Template, SheetsField } from 'base';
import { ElementFromTag } from 'element';
import { Label, FlashMessage } from 'components';
import 'intl-tel-input';

class WhatsApp extends Template {
    constructor(progressBar, title, root, data) {
        let dataFiltered = data.filter(invitee => invitee.fields.shift().value == 'TRUE');
        super(progressBar, title, root, dataFiltered);

        this.setProgressBar(5);
        this.setTitle('Would you like important announcements & updates for the wedding?');
        this.whiteSpace[1] = 20;

        let grid = new ElementFromTag('div');
        grid.addClass('grid',
                      'two-auto-cols',
                      'center-aligned',
                      'column-gap-10',
                      'row-gap-10',
                      'text-align-left');
        this.subContainers[1] = grid;

        this.outline.push(
            {name: 'info', container: this.root},
            {name: 'phone', container: grid}
        );
    }

    get info() {
        let message = new FlashMessage('info', 'WhatsApp will be our primary channel for communicating with the guests. We strongly recommend that at least one person in the party provide a phone number tied to a WhatsApp account.');
        return [message];
    }

    get phone() {
        let ages = [];
        for (const invitee of this.data) {
            let field = new SheetsField(invitee.fields[0]),
                labelContainer = new ElementFromTag('div'),
                label = new Label(field.cell, invitee.name),
                phoneInput = new ElementFromTag('input');
            phoneInput.addClass('text-input');
            phoneInput.set('type', 'tel');
            phoneInput.set('name', field.cell);
            phoneInput.set('value', (field.value == null) ? '' : field.value);
            labelContainer.addClass('align-self-center');
            labelContainer.append(label);

            ages.push(labelContainer, phoneInput);
        }
        return ages;
    }

    build() {
        super.build();
        let phoneInputs = this.root.element.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(pi => {
            window.intlTelInput(pi, {
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.12/build/js/utils.js",
                countryOrder: ["us"],
                initialCountry: "us"
            });
        });
    }
}

export { WhatsApp };
