import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import {
  getCountries,
  orderByName,
  orderByPopulation,
  filterByContinent,
  getActivities,
  filterByActivity,
} from "../../redux/actions";
import Paginate from "../../components/Paginate/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.allActivities);
  const [selectedActivity, setSelectedActivity] = useState("");
  const paisesPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(0);
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    setPaginaActual(0);
  }, [countries]);

  const onPageChange = (pagina) => {
    setPaginaActual(pagina);
  };

  const primeraPagina = paginaActual * paisesPorPagina;
  const ultimaPagina = primeraPagina + paisesPorPagina;
  const paises = countries.slice(primeraPagina, ultimaPagina);

  const handleOrderByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setOrder(event.target.value);
  };

  const handleOrderByPopulation = (event) => {
    event.preventDefault();
    dispatch(orderByPopulation(event.target.value));
    setOrder(event.target.value);
  };

  const handleContinents = (event) => {
    event.preventDefault();
    const continent = event.target.value;
    if (continent === "All") {
      dispatch(getCountries());
    } else {
      dispatch(filterByContinent(continent));
    }
  };

  const handleActivityFilter = (event) => {
    event.preventDefault();
    const activityId = event.target.value;
    setSelectedActivity(activityId);

    if (activityId === "All") {
      dispatch(getCountries());
    } else {
      dispatch(filterByActivity(activityId));
    }
  };

  return (
    <>
      <h1>Este es el Home</h1>
      <select onChange={handleOrderByName}>
        <option value="Default">A - Z</option>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select onChange={handleOrderByPopulation}>
        <option value="Default">Por Poblacion</option>
        <option value="D">Mayor Poblacion</option>
        <option value="A">Menor Poblacion</option>
      </select>
      <select onChange={handleContinents}>
        <option value="All">Todos los Continentes</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="Oceania">Oceania</option>
        <option value="South America">South America</option>
      </select>
      <select onChange={handleActivityFilter}>
        <option value="All">Todas las actividades</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.nombre}>
            {activity.nombre}
          </option>
        ))}
      </select>
      <Container countries={paises} />
      <Paginate
        totalPaises={countries.length}
        paisesPorPagina={paisesPorPagina}
        paginaActual={paginaActual}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Home;
