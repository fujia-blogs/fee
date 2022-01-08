const AnimalApi = require('../lib/animal-api').default;

AnimalApi.getCat().then((animal) => {
  console.log(animal);
});
