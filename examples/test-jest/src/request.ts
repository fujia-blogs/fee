import axios from 'axios';

export const queryArticles = () => {
  return axios.get('https://api.fujia.site/api/v1/articles');
};

export const queryArticlesErr = () => {
  return axios.get('https://api.fujia.site/api/v1/article');
};

export const getArticles = () => {
  return axios.get('https://api.fujia.site/api/v1/articles');
};
