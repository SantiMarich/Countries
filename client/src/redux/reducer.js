import {
  GET_ACTIVITIES,
  GET_COUNTRIES,
  GET_DETAIL,
  GET_QUERY,
  ORDER_NAME,
  ORDER_POPULATION,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
} from "./actions";

const initialState = {
  countries: [],
  allActivities: [],
  selectedCountry: null,
  allCountries: [],
  selectedActivity: null, // Nuevo estado para almacenar el ID de la actividad seleccionada
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allContinents: action.payload,
        allCountries: action.payload,
        filteredCountries: action.payload,
      };

    case GET_DETAIL:
      return { ...state, selectedCountry: action.payload };

    case GET_QUERY:
      return { ...state, countries: action.payload };

    case GET_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };

    case ORDER_NAME:
      const ordenAlfabetico = action.payload;
      const ordenPaises = [...state.countries].sort((a, z) => {
        if (ordenAlfabetico === "Default") {
          return { ...state };
        } else if (ordenAlfabetico === "A") {
          return a.name.localeCompare(z.name);
        } else if (ordenAlfabetico === "D") {
          return z.name.localeCompare(a.name);
        }
      });
      return { ...state, countries: ordenPaises };

    case ORDER_POPULATION: {
      const order = action.payload;
      const ordenPoblacion = [...state.countries].sort((a, b) => {
        const populationA = Number(a.population);
        const populationB = Number(b.population);

        if (order === "Default") {
          return { ...state };
        } else if (order === "A") {
          return populationA - populationB;
        } else if (order === "D") {
          return populationB - populationA;
        }
      });

      return { ...state, countries: ordenPoblacion };
    }

    case FILTER_CONTINENT: {
      const { allContinents } = state;
      const filteredCountries = allContinents.filter(
        (country) => country.continents === action.payload
      );
      return {
        ...state,
        countries: filteredCountries,
      };
    }

    case FILTER_ACTIVITY: {
      const { allCountries } = state;
      const activityName = action.payload.toLowerCase();
      const filteredCountries = allCountries.filter((country) =>
        country.activities?.some(
          (activity) => activity.nombre.toLowerCase() === activityName
        )
      );

      return {
        ...state,
        countries: filteredCountries,
      };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
