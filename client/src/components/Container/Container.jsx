import Card from "../Card/Card";
import style from "./Container.module.css";

const Container = ({ countries }) => {
  return (
    <div className={style.container}>
      {countries.map((country) => {
        return (
          <Card
            key={country.id}
            idPais={country.id}
            name={country.name}
            flags={country.flags}
            continents={country.continents}
            capital={country.capital}
            subregion={country.subregion}
            area={country.area}
            population={country.population}
            activity={country.activity}
          />
        );
      })}
    </div>
  );
};

export default Container;
