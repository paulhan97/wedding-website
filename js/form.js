import { ElementFromId } from 'element';
import { Router } from 'router';
import { PostCurrentForm } from 'request';

class FormHandler {
    constructor(initialSection, progressBarId, titleId, rootId, nextButtonId, previousButtonId, loadingId, formId) {
        this.progressBar = new ElementFromId(progressBarId);
        this.title = new ElementFromId(titleId);
        this.root = new ElementFromId(rootId);
        this.currentSection = initialSection;
        this.previousButton = new ElementFromId(previousButtonId);
        this.loading = new ElementFromId(loadingId);
        this.form = new ElementFromId(formId);

        this.loadSection(initialSection);
        
        let nextButton = new ElementFromId(nextButtonId);
        nextButton.on('click', event => {
            event.preventDefault();
            this.loadNextSection();
        });

        this.previousButton.on('click', event => {
            event.preventDefault();
            this.loadPreviousSection();
        });
    }

    async loadSection(section) {
        this.form.hide();
        this.loading.show();

        if (section == 'RSVP_DECLINED') {
            window.location.replace("/rsvp-declined");
        }
        if (section == 'RSVP_FINISHED') {
            window.location.replace('/rsvp-finished');
        }

        if (section == 'GENERAL_ATTENDANCE') {
            this.previousButton.hide();
        } else {
            this.previousButton.show();
        }

        
        let request = Router[section].request,
            responseBody = await request.responseBody;
        
        if (section == 'FLIGHT_INFORMATION'
            && responseBody.length == 0) {
            this.loadNextSection();
        }
        
        let templateClass = Router[section].template,
            template = new templateClass(this.progressBar, this.title, this.root, responseBody);
        template.build();

        this.loading.hide();
        this.form.show();
    }

    loadNextSection() {
        let postToForm = new PostCurrentForm('form');
        postToForm.send();

        for (const route of Router[this.currentSection].next) {
            if (route.condition()) {
                this.clearRoot();
                this.loadSection(route.section);
                this.currentSection = route.section;
                return;
            }
        }
    }

    loadPreviousSection() {
        let section = Router[this.currentSection].previous
        this.clearRoot();
        this.loadSection(section);
        this.currentSection = section;
    }

    clearRoot() {
        this.root.clear();
    }
}

export { FormHandler }
