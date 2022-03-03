import { genConfig } from './snapshot';

test('genConfig', () => {
  expect(genConfig()).toMatchSnapshot({
    time: expect.any(Date),
  });
});
