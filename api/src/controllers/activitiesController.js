const { Activity, Country } = require("../db.js");

const createActivity = async (
  nombre,
  dificultad,
  duracion,
  temporada,
  countryId
) => {
  try {
    const country = await Country.findByPk(countryId);
    if (!country) {
      throw new Error("País no encontrado");
    }
    const newActivity = await Activity.create({
      nombre,
      dificultad,
      duracion,
      temporada,
      countryId,
    });

    await newActivity.addCountry(country);

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


module.exports = {createActivity, getAllActivities}