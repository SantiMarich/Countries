import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.idPais}`}>
      <div className={style.card}>
        <div className={style.cardContenido}>
          <h1 className={style.cardPais}>{props.name}</h1>
          <h2 className={style.cardContinente}>{props.continents} </h2>
        </div>
        <img src={props.flags} alt={""} className={style.imagenFondo} />
      </div>
    </Link>
  );
};

export default Card;
