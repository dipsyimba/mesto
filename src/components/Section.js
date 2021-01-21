export default class Section {
    constructor({renderer}, container) {
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element, flag = false) {
        if(flag) this._container.prepend(element);
        else this._container.append(element)
    }
}