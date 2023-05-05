import { GET_ACTIVITIES, GET_COUNTRIES, GET_DETAIL, GET_QUERY } from "./actions";

const initialState = {
  countries: [],
  activities: [],
  selectedCountry: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {...state, countries: action.payload};
    case GET_DETAIL:
      return {...state, selectedCountry: action.payload}; 
    case GET_QUERY:
      return {...state, countries: action.payload};
    case GET_ACTIVITIES:
      return {...state, activities: action.payload};
    default:
      return {...state};
  }
};

export default rootReducer;
