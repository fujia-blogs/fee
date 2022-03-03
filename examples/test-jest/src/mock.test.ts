import axios from 'axios';
import { runCb } from './mock';
import { getArticles } from './request';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('runCb', () => {
  const fn = jest.fn();
  fn.mockReturnValueOnce('fu').mockReturnValueOnce('sunny');

  runCb(fn);
  runCb(fn);
  console.log(fn.mock);
  expect(fn).toBeCalled();
  expect(fn).toBeCalledTimes(2);
});

test.only('getArticles', async () => {
  // 也可以使用mockResolvedValueOnce

  mockedAxios.get.mockResolvedValue({
    success: true,
    data: {},
  });

  await getArticles().then((res) => {
    // console.log(res);
    expect(res).toMatchObject({
      success: true,
    });
  });
});
