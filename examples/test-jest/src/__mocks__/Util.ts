const Util = jest.fn(() => {
  console.log('constructor');
});

Util.prototype.init = jest.fn(() => {
  console.log('init');
});

export default Util;
