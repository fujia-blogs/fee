export default class Util {
  constructor(public index = 0) {
    console.log('init');
  }

  add() {
    this.index += 1;
  }
}
