import React, { useState, useEffect } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

function SearchBar({ onSearch }) {
  const [idPais, setIdPais] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      setIdPais(inputValue);
      onSearch(inputValue);
    } else if (!inputValue) {
      setIdPais("");
      dispatch(getCountries());
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
    </div>
  );
}

export default SearchBar;
