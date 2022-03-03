import Counter from './Counter';

let counter: Counter;

// beforeAll(() => {
//   counter = new Counter();
// });

beforeEach(() => {
  counter = new Counter();
});

test.only('add method of Counter', () => {
  expect(counter.add()).toBe(2);
});

test('minus method of Counter', () => {
  expect(counter.minus()).toBe(0);
});
