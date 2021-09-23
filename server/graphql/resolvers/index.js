const countriesResolvers = require("./countries");

module.exports = {
  Query: {
    ...countriesResolvers.Query
  }
};
