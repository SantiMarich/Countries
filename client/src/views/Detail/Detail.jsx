import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = ({ match }) => {
  const [country, setCountry] = useState({});
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

    fetchCountry();
  }, [match.params.id]);

  const handleClose = () => {
    // Redirigir al usuario a la página de inicio (Home)
    // Puedes ajustar la ruta según tu configuración de rutas
    // Por ejemplo, si tu ruta de inicio es "/" en lugar de "/home"
    // sería <Link to="/"> en lugar de <Link to="/home">
    return <Link to="/home"></Link>;
  };

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
