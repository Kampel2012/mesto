export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }

  addItem(elem) {
    this.container.prepend(elem);
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(this.renderer(item));
    });
  }
}
