import axios from "axios";

const url = "http://localhost:3001";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_QUERY = "GET_QUERY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_POPULATION = "POPULATION_POPULATION";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";

export const getCountries = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${url}/countries`);
    const countries = apiData.data;
    dispatch({ type: GET_COUNTRIES, payload: countries });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`${url}/countries/${id}`);
    const countries = apiData.data;
    dispatch({ type: GET_DETAIL, payload: countries });
  };
};

export const getQuery = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(`${url}/countries?name=${name}`);
    const countries = apiData.data;
    dispatch({ type: GET_QUERY, payload: countries });
  };
};

export const getactivities = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${url}/activities`);
    const activities = apiData.data;
    dispatch({ type: GET_ACTIVITIES, payload: activities });
  };
};

export function orderByName(name) {
  return {
    type: ORDER_NAME,
    payload: name,
  };
}

export function orderByPopulation(order) {
  return {
    type: ORDER_POPULATION,
    payload: order,
  };
}

export function filterByContinent(continent) {
  return {
    type: FILTER_CONTINENT,
    payload: continent,
  };
}

export function filterByActivity(payload) {
  return {
    type: FILTER_ACTIVITY,
    payload,
  };
}
