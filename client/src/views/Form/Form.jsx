import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryId: "",
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const validateCountryId = (value) => {
    if (value.length === 3) {
      setErrors({ ...errors, countryId: "" });
    } else {
      setErrors({ ...errors, countryId: "El ID del país debe tener 3 letras" });
    }
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "countryId") {
      validateCountryId(value);
    }

    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/activities", form)
      .then((res) => alert(res))
      .catch((error) => alert(error));
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Dificultad:</label>
        <input
          type="text"
          name="dificultad"
          value={form.dificultad}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Duración:</label>
        <input
          type="text"
          name="duracion"
          value={form.duracion}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Temporada:</label>
        <input
          type="text"
          name="temporada"
          value={form.temporada}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>País:</label>
        <select
          name="countryId"
          value={form.countryId}
          onChange={changeHandler}
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.id}
            </option>
          ))}
        </select>
        {errors.countryId && <span>{errors.countryId}</span>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
