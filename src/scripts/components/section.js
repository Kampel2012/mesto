export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
  }

  renderItems() {
    this.items.forEach(item => {
      this.addItem(this.renderer(item));
    });
  }

  addItem(elem) {
    document.querySelector(this.containerSelector).prepend(elem);
  }
}
