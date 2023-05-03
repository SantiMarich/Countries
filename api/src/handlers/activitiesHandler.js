const {
  createActivity,
  getAllActivities,
} = require("../controllers/activitiesController");

const postActivitiesHandler = async (req, res) => {
  const { nombre, dificultad, duracion, temporada, countryId } = req.body;
  try {
    const newActivity = await createActivity(
      nombre,
      dificultad,
      duracion,
      temporada,
      countryId
    );
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActivitiesHandler = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {postActivitiesHandler, getActivitiesHandler}







