import { Request } from "./request.js";

class Navigator {
    constructor(dataManager) {
        this.currentPage = 0;
        this.pageOrder = [
            'general-attendance',
            'event-attendance',
            'transport-requests',
            'food-allergies',
            'age-groups',
            'whatsapp',
            'song-requests'
        ];
        this.hideAllPages();
        this.showPage(0);
    }

    hideAllPages() {
        for (const pageId of this.pageOrder) {
            document.getElementById(pageId).style.display = 'none';
        }
    }

    showPage(index) {
        document.getElementById(this.pageOrder[index]).style.display = 'block';
    }

    hidePage(index) {
        document.getElementById(this.pageOrder[index]).style.display = 'none';
    }

    nextPage(endConditions) {
        if (endConditions.isEnd) {
            this.jumpToEnd(endConditions.payload);
            return;
        }
        this.hidePage(this.currentPage);
        this.currentPage++;
        this.showPage(this.currentPage);
    }

    previousPage() {
        this.hidePage(this.currentPage);
        this.currentPage--;
        this.showPage(this.currentPage);
    }

    jumpToEnd(payload) {
        let postRequest = new Request('POST', {'Content-Type': 'application/json'}, 'post_rsvp_data');
        postRequest.body = JSON.stringify(payload);
        postRequest.send().then(response => {
            if (response.ok) {
                document.getElementsByTagName('main')[0].innerHTML = nunjucks.render('templates/rsvp-finished.html', payload);
            }
        });
    }
}

export { Navigator };