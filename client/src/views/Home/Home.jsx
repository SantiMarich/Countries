import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import {
  getCountries,
  orderByName,
  orderByPopulation,
  filterByContinent,
  filterByActivity,
} from "../../redux/actions";
import Paginate from "../../components/Paginate/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activity = useSelector((state) => state.activity);
  const paisesPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(0);
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getCountries());
    dispatch(filterByActivity());
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

  const handleOrder = (event) => {
    event.preventDefault();
    dispatch(orderByPopulation(event.target.value));
    setOrder(event.target.value);
  };

  const handleContinents = (event) => {
    event.preventDefault();
    dispatch(filterByContinent(event.target.value));
    setOrder(event.target.value);
  };

  const handleActivity = (event) => {
    event.preventDefault();
    const activity = event.target.value;
    dispatch(filterByActivity(activity));
    setOrder(event.target.value);
  };

  return (
    <>
      <h1>Este es el Home</h1>
      <select onChange={handleOrderByName}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select onChange={handleOrder}>
        <option value="D">Mayor Poblacion</option>
        <option value="A">Menor Poblacion</option>
      </select>
      <select onChange={handleContinents}>
        <option value="All">Todos los continentes</option>
        <option value="Africa">África</option>
        <option value="Antarctica">Antártida</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="North America">América del Norte</option>
        <option value="Oceania">Oceanía</option>
        <option value="South America">América del Sur</option>
      </select>
      <select onChange={handleActivity}>
        <option value="All">Todas las actividades</option>
        {activity.map((e) => (
          <option value={e} key={e}>
            {e}
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
