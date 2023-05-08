const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");

const getcountryByName = async (name) => {
  const databaseCountries = await Country.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${name.toLowerCase()}%`,
      },
    },
    include: Activity,
  });
  return [...databaseCountries];
};

const getAllCountries = async () => {
  const databaseCountries = await Country.findAll();
  return [...databaseCountries];
};

const getCountryById = async (idPais) => {
  const country = await Country.findByPk(idPais.toUpperCase(), {
    attributes: [
      "id",
      "name",
      "flags",
      "continents",
      "population",
      "subregion",
      "area",
      "capital",
    ],
    include: Activity,
  });
  return country;
};

module.exports = { getCountryById, getAllCountries, getcountryByName };
