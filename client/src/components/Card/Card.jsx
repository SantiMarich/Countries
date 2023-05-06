import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.idPais}`}>
      <div className={style.card}>
        <h1>{props.name}</h1>
        <img src={props.flags} alt={""} className={style.imagenFondo} />
        <h2>{props.continents} </h2>
      </div>
    </Link>
  );
};

export default Card;
