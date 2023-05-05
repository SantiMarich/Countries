import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <h1>{props.name}</h1>
      <image>Flags:{props.flags}</image>
      <h2>{props.continents} </h2>
    </div>
  );
};

export default Card;
