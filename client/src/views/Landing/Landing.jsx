import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.containerLanding}>
      <h1>Explore the World</h1>
      <h3>Santiago Marich</h3>
      <h4>Full Stack Developer</h4>
      <div className={style.boxLanding}>
        <Link className={style.linkLanding} to="/home">
          <button className={style.buttonLanding}>HOME PAGE</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
