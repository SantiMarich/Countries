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
  allContinents: [],
  allActivities: [],
  activity: [],
  selectedCountry: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allContinents: action.payload,
      };
    case GET_DETAIL:
      return { ...state, selectedCountry: action.payload };

    case GET_QUERY:
      return { ...state, countries: action.payload };

    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };

    case ORDER_NAME:
      const ordenAlfabetico = action.payload;
      const ordenPaises = [...state.countries].sort((a, z) => {
        if (ordenAlfabetico === "A") {
          return a.name.localeCompare(z.name);
        } else {
          return z.name.localeCompare(a.name);
        }
      });
      return { ...state, countries: ordenPaises };

    case ORDER_POPULATION: {
      const order = action.payload;
      const ordenPoblacion = [...state.countries].sort((a, b) => {
        const populationA = Number(a.population);
        const populationB = Number(b.population);

        if (order === "A") {
          return populationA - populationB;
        } else {
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

    case FILTER_ACTIVITY:
      const allActivities = state.allActivities;
      const activityFilter =
        action.payload === "All"
          ? allActivities.filter((e) => e.activities.length > 0)
          : allActivities.filter((c) =>
              c.activities.find(
                (element) => element.name.toLowerCase() === action.payload
              )
            );
      return {
        ...state,
        countries: activityFilter,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
