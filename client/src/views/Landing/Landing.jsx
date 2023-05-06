import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.contenedor}>
      <h1>App Countries</h1>
      <div className={style.box}>
        <button className={style.button}>
          <Link className={style.link} to="/home">
            Ingresar
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
