import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <p>
        Name:{props.name}
        Flags:{props.flags}
        Continents:{props.continents}
      </p>
    </div>
  );
};

export default Card;
