export const timerFn = (cb: CallableFunction, interval = 3000) => {
  setTimeout(() => {
    if (typeof cb === 'function') {
      cb();
    }
  }, interval);
};
