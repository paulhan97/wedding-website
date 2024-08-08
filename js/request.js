// Globals
const params = new URLSearchParams(document.location.search),
    inviteId = params.get('i');

class Request {
    constructor(method, headers, path) {
        this.method = method;
        this.headers = headers
        this.url = `https://i0w4aifr9f.execute-api.us-west-1.amazonaws.com/dev/${path}`
    }

    send() {
        let options = {
            method: this.method,
            headers: this.headers
        }
        if ('body' in this) {
            options.body = this.body
        }
        return fetch(this.url, options);
    }

    get responseBody() {
        return this.send()
            .then(response => {
                if (!response.ok) {
                    error = response.text()
                    throw new Error(`${response.status}: ${error}`);
                }
                return response.json();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

class GetFormData extends Request {
    constructor(query, columns) {
        let headers = {'Content-Type': 'application/json'},
            params = new URLSearchParams;
        
        params.append('invite_id', inviteId);
        params.append('query', query);
        params.append('columns', columns);
        let path = `get-form-data?${params.toString()}`;
        super('GET', headers, path);
    }
}

class PostCurrentForm extends Request {
    constructor(formId) {
        let formElement = document.getElementById(formId),
        data = new FormData(formElement),
        headers = {'Content-Type': 'application/x-www-form-urlencoded'},
        path = 'update-rsvp';

        super('POST', headers, path);
        this.body = JSON.stringify({
            cells: [...data.keys()],
            values: [...data.values()]
        });
    }
}

export { Request, GetFormData, PostCurrentForm };
