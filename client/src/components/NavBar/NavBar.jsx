import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = ({ onSearch }) => {
  return (
    <div className={style.HeaderContainer}>
      <div className={style.NavBarContainer}>
        <div className={style.contenidoContainer}>
          <Link to="/home">HOME</Link>
          <Link to="/create">FORM</Link>
          <Link to="/about">ABOUT</Link>
        </div>
        <div className={style.NavBarSearchBar}>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
