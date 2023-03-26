export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(elem) {
    this._container.prepend(elem);
  }

  renderItems(data) {
    data.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}
