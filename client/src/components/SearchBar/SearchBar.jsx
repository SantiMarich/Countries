import React, { useState } from "react";
import style from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [idPais, setIdPais] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setIdPais(inputValue);
    onSearch(inputValue);
  };

  const handleSearch = () => {
    if (idPais.trim() === "") {
      setIdPais("");
      onSearch("");
    }
  };

  return (
    <div className={style.search}>
      <input
        className={style.input}
        type="search"
        placeholder="Search..."
        value={idPais}
        onChange={handleChange}
      />
      <button className={style.boton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
