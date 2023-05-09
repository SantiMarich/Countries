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
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      const countriesWithActivities = action.payload.map((country) => {
        const activities = state.allActivities.filter(
          (activity) =>
            country.activities && country.activities.includes(activity.nombre)
        );
        return {
          ...country,
          activities,
        };
      });
      return {
        ...state,
        countries: countriesWithActivities,
        allContinents: action.payload,
        allCountries: action.payload,
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
      const ordenPaises = [...state.countries].sort((a, z) =>
        ordenAlfabetico === "A"
          ? a.name.localeCompare(z.name)
          : z.name.localeCompare(a.name)
      );
      return { ...state, countries: ordenPaises };

    case ORDER_POPULATION: {
      const order = action.payload;
      const ordenPoblacion = [...state.countries].sort((a, b) => {
        const populationA = Number(a.population);
        const populationB = Number(b.population);

        return order === "A"
          ? populationA - populationB
          : populationB - populationA;
      });

      return { ...state, countries: ordenPoblacion };
    }

    case FILTER_CONTINENT: {
      const filteredCountries = state.allContinents.filter(
        (country) => country.continents === action.payload
      );
      return {
        ...state,
        countries: filteredCountries,
      };
    }

    case FILTER_ACTIVITY: {
      const selectedActivity = action.payload;

      if (!selectedActivity) {
        return {
          ...state,
          countries: state.allCountries,
        };
      }

      const countriesByActivity = state.allCountries.filter((country) =>
        country.activities.some(
          (activity) =>
            activity.nombre.toLowerCase() === selectedActivity.toLowerCase()
        )
      );

      return { ...state, countries: countriesByActivity };
    }

    default:
      return state;
  }
};

export default rootReducer;
