import { timerFn } from './timer';

jest.useFakeTimers();

test('timerFn', () => {
  const fn = jest.fn();
  timerFn(fn);
  // jest.runAllTimers();
  jest.advanceTimersByTime(3000);
  expect(fn).toHaveBeenCalledTimes(1);
});
