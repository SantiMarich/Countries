const axios = require("axios");
const { API_URL } = process.env;
const { Country } = require("../db.js");

const APIToDb = async () => {
  const allCountries = Country.findAll();
  if (!allCountries.length) {
    const apiCountriesResponse = await axios.get(API_URL);
    var apiCountries = apiCountriesResponse.data.map((pais) => {
      return {
        id: pais.cca3,
        name: pais.name.common,
        flags: pais.flags[0],
        continents: pais.continents[0],
        capital: pais.capital ? pais.capital[0] : "Not found",
        subregion: pais.subregion,
        area: pais.area,
        population: pais.population,
      };
    });
    await Country.bulkCreate(apiCountries);
  }
};

module.exports = { APIToDb };