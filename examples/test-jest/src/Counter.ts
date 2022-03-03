export default class Counter {
  constructor(public index = 1) {}

  add(value = 1) {
    this.index += value;
    return this.index;
  }

  minus(value = 1) {
    return (this.index -= value);
    return this.index;
  }
}
