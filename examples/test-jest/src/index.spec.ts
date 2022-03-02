import { add } from './index';

const testObj = {
  name: 'sunny',
};

describe('testing index', () => {
  it('math', () => {
    expect(add(3, 4)).toBe(7);
    expect(testObj).not.toBe({
      name: 'sunny',
    });
    expect(testObj).toEqual({
      name: 'sunny',
    });
  });
});
