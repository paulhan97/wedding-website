class Element {
    constructor(element) {
        this.element = element;
        this.children = [];
    }

    append(...children) {
        for (const child of children) {
            this.children.push(child);
            this.element.appendChild(child.element);
        }
    }

    get(attribute) {
        return this.element.getAttribute(attribute);
    }

    set(attribute, value) {
        this.element.setAttribute(attribute, value);
    }

    remove(attribute) {
        this.element.removeAttribute(attribute);
    }

    setText(text) {
        this.element.innerHTML = text;
    }

    setData(attribute, value) {
        this.element.dataset[attribute] = value;
    }

    addClass(...classNames) {
        for (const className of classNames) {
            this.element.classList.add(className);
        }
    }

    removeClass(...classNames) {
        for (const className of classNames) {
            this.element.classList.remove(className);
        }
    }

    hasClass(className) {
        return this.element.classList.contains(className);
    }

    show() {
        this.element.classList.remove('display-none');
        this.element.classList.remove('visibility-hidden');
    }

    hide() {
        this.element.classList.add('display-none');
    }

    hideInPlace() {
        this.element.classList.add('visibility-hidden');
    }

    get firstChild() {
        return new Element(this.element.firstElementChild);
    }

    get lastChild() {
        return new Element(this.element.lastElementChild);
    }

    on(eventType, callable) {
        this.element.addEventListener(eventType, callable);
    }

    clear() {
        this.element.innerHTML = '';
    }

    getChildren() {
        return [...this.element.children].map(child => new Element(child));
    }

    select(selector) {
        let results = [...this.element.querySelectorAll(`:scope ${selector}`)],
            wrapped = results.map(element => new Element(element));
        return wrapped;
    }
}

class ElementFromTag extends Element {
    constructor(tag) {
        super(document.createElement(tag));
    }
}

class ElementFromId extends Element {
    constructor(id) {
        super(document.getElementById(id));
    }
}

export { Element, ElementFromTag, ElementFromId }
