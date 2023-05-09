import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import FilterByActivity from "../FIlter/FilterByActivity";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const countriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(0);
  }, [countries]);

  const onPageChange = (pagina) => {
    setCurrentPage(pagina);
  };

  const firstPage = currentPage * countriesPerPage;
  const lastPage = firstPage + countriesPerPage;
  const paises = countries.slice(firstPage, lastPage);

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

  const handleFilterByActivity = (activity) => {
    dispatch(filterByActivity(activity));
  };

  return (
    <>
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
      <FilterByActivity filterByActivity={handleFilterByActivity} />
      <Container countries={paises} />
      <Paginate
        totalPaises={countries.length}
        paisesPorPagina={countriesPerPage}
        paginaActual={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countries,
  activities: state.allActivities,
});

const mapDispatchToProps = (dispatch) => ({
  getCountries: () => dispatch(getCountries()),
  orderByName: (value) => dispatch(orderByName(value)),
  orderByPopulation: (value) => dispatch(orderByPopulation(value)),
  filterByContinent: (value) => dispatch(filterByContinent(value)),
  getActivities: () => dispatch(getActivities()),
  filterByActivity: (value) => dispatch(filterByActivity(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
