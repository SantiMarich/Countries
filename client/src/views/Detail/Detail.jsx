import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = ({ match }) => {
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/countries/${match.params.id}`
        );

        setCountry(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountry();
  }, [match.params.id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={style.detailContainer}>
        <img src={country.flags} alt="" className={style.detailImage} />
        <h2 className={style.detailName}>{country.name}</h2>
        <h5>{country.continents}</h5>
        <h5>Capital: {country.capital}</h5>
        <h5>Subregion: {country.subregion}</h5>
        <h5>Area: {country.area} km²</h5>
        <h5>Poblacion: {country.population} Habitantes</h5>
        <h5>Actividades:</h5>
        <ul>
          {country.activities.map((activity) => (
            <li key={activity.id}>
              Nombre: {activity.nombre}, Dificultad: {activity.dificultad},
              Duración: {activity.duracion}, Temporada: {activity.temporada}
            </li>
          ))}
        </ul>
      </div>

      <button>
        <Link to="/home">Close</Link>
      </button>
      <button>
        <Link to="/create">Crear Actividad</Link>
      </button>
    </div>
  );
};

export default Detail;
