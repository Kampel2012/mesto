export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(elem) {
    this._container.prepend(elem);
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}
