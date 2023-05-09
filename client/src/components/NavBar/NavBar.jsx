import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ onSearch }) => {
  return (
    <div>
      <Link to="/home">HOME</Link>
      <Link to="/create">FORM</Link>
      <Link to="/about">ABOUT</Link>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default NavBar;
