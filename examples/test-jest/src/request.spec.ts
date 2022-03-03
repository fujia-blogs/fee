import { queryArticles, queryArticlesErr } from './request';

test('queryArticles with way 1', () => {
  // way 1
  return queryArticles().then((res) => {
    expect(res.data).toMatchObject({
      success: true,
    });
  });
});

test('queryArticles with way 2', () => {
  return expect(queryArticles()).resolves.toMatchObject({
    data: {
      success: true,
    },
  });
});

test('queryArticlesErr with way 1', () => {
  expect.assertions(1);
  return queryArticlesErr().catch((e) => {
    // console.log(e);
    expect(e.toString().indexOf('404') > -1).toBeTruthy();
  });
});

test('queryArticlesErr with way 2', () => {
  return expect(queryArticlesErr()).rejects.toThrow();
});
