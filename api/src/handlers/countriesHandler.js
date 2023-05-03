const {
  getCountryById,
  countryByName,
  getAllCountries,
} = require("../controllers/countriesController");

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let todosPaises;
    if (name && name.trim()) {
      todosPaises = await countryByName(name);
    } else {
      todosPaises = await getAllCountries();
    }
    if (todosPaises.length === 0) {
      res.status(404).json({ message: "No se encontraron coincidencias." });
    } else {
      res.status(200).json(todosPaises);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountryHandler = async (req, res) => {
  const { id } = req.params;
  try {
      if (id) {
          const country = await getCountryById(id);
          res.status(200).json(country);
      }
  } catch (error) {
      res.status(400).json({ error: error.message })
  }

}

module.exports = { getCountriesHandler, getCountryHandler };


