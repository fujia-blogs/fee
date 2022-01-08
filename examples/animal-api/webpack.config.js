const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'animal-api.js',
    library: 'AnimalApi',
    libraryTarget: 'var',
  },
};
