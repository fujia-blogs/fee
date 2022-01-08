import axios from 'axios';

const getCat = () => {
  return axios.get('https://aws.random.cat/meow').then((res) => {
    const imageSrc = res.data.file;
    const text = 'CAT';
    return {
      imageSrc,
      text,
    };
  });
};

const getDog = () => {
  return axios.get('https://random.dog/woof.json').then((res) => {
    const imageSrc = res.data.url;
    const text = 'DOG';
    return {
      imageSrc,
      text,
    };
  });
};

const getGoat = () => {
  const imageSrc = 'http://placegoat.com/200';

  const text = 'GOAT';
  return Promise.resolve({
    imageSrc,
    text,
  });
};

export default {
  getCat,
  getDog,
  getGoat,
};
