const { Activity, Country } = require("../db.js");

const createActivity = async (
  nombre,
  dificultad,
  duracion,
  temporada,
  countryIds
) => {
  try {
    const newActivity = await Activity.create({
      nombre,
      dificultad,
      duracion,
      temporada,
    });

    const countries = await Country.findAll({
      where: { id: countryIds },
    });

    await newActivity.setCountries(countries);

    return newActivity;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllActivities = async () => {
  const actividades = await Activity.findAll({
    include: {
      model: Country,
    },
  });
  return actividades;
};

module.exports = { createActivity, getAllActivities };
