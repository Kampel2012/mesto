export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(elem) {
    this._container.prepend(elem);
  }

  addItemReverse(elem) {
    this._container.append(elem);
  }

  renderItems(data) {
    data.forEach(item => {
      this.addItemReverse(this._renderer(item));
    });
  }
}
