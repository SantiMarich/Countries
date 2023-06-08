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
        <div className={style.containerImage}>
          <img src={country.flags} alt="" className={style.detailImage} />
        </div>
        <h2 className={style.detailName}>{country.name}</h2>
        <h5 className={style.continents}>{country.continents}</h5>
        <h5 className={style.data}>Capital: {country.capital}</h5>
        <h5 className={style.data}>Subregion: {country.subregion}</h5>
        <h5 className={style.data}>Area: {country.area} km²</h5>
        <h5 className={style.data}>Poblacion: {country.population} Habs.</h5>
        <h5 className={style.activity}>ACTIVIDADES</h5>
        <ul>
          {country.activities.map((activity) => (
            <li key={activity.id}>{activity.nombre}</li>
          ))}
        </ul>
        <div className={style.buttonContainer}>
          <Link to="/create">
            <button className={style.buttonClose}>CREAR ACTIVIDAD</button>
          </Link>
          <Link to="/home">
            <button className={style.buttonClose}>BACK TO HOME</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
