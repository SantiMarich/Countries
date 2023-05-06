import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = ({ match }) => {
  const [country, setCountry] = useState({});
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/countries/${match.params.id}`
        );

        setCountry(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/activities?country=${match.params.name}`
        );

        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchCountry();
    fetchActivities();
  }, [match.params.id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <img src={country.flags} alt="" className={style.imagenFondo} />
        <h2 className={style.nombre}>{country.name}</h2>
        <h5>{country.continents}</h5>
        <h5>Capital: {country.capital}</h5>
        <h5>Subregion: {country.subregion}</h5>
        <h5>Area: {country.area} km²</h5>
        <h5>Poblacion: {country.population} Habitantes</h5>
      </div>

      <h3>Actividades</h3>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>{activity.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>No hay actividades</p>
      )}

      <button>
        <Link to="/create">Crear Actividad</Link>
      </button>
    </div>
  );
};

export default Detail;
