import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./Container.module.css";

const Container = () => {
  const countries = useSelector((state) => state.countries);

  return (
    <div className={style.container}>
      {countries.map((country) => {
        return (
          <Card
            id={country.id}
            name={country.name}
            flags={country.flags}
            continents={country.continents}
            capital={country.capital}
            subregion={country.subregion}
            area={country.area}
            population={country.population}
          />
        );
      })}
    </div>
  );
};

export default Container;
