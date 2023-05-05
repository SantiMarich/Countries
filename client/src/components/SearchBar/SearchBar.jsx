import { useState } from "react";
import style from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [idPais, setIdPais] = useState("");

  const handleChange = (event) => {
    setIdPais(event.target.value);
  };

  return (
    <div className={style.search}>
      <input
        className={style.input}
        type="search"
        placeholder="Search..."
        onChange={handleChange}
      />{" "}
      <button className={style.boton} onClick={() => onSearch(idPais)}>
     </button>
    </div>
  );
}

export default SearchBar;