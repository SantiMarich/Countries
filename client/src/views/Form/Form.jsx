import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getActivities } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryIds: [],
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryIds: "",
  });

  useEffect(() => {
    fetchCountries();
    dispatch(getActivities());
  }, [dispatch]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const validateNombre = (value) => {
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(value)) {
      setErrors({ ...errors, nombre: "" });
    } else {
      setErrors({
        ...errors,
        nombre: "El nombre debe contener solo letras y espacios",
      });
    }
  };

  const validateDificultad = (value) => {
    const number = parseInt(value);
    if (Number.isInteger(number) && number >= 1 && number <= 5) {
      setErrors({ ...errors, dificultad: "" });
    } else {
      setErrors({
        ...errors,
        dificultad: "La dificultad debe ser un número del 1 al 5",
      });
    }
  };

  const validateDuracion = (value) => {
    const number = parseInt(value);
    if (Number.isInteger(number) && number >= 1 && number <= 24) {
      setErrors({ ...errors, duracion: "" });
    } else {
      setErrors({
        ...errors,
        duracion: "La duración debe ser un número entre 1 y 24",
      });
    }
  };

  const validateTemporada = (value) => {
    const temporada = value.toUpperCase();
    const opcionesValidas = ["VERANO", "OTOÑO", "INVIERNO", "PRIMAVERA"];
    if (opcionesValidas.includes(temporada)) {
      setErrors({ ...errors, temporada: "" });
    } else {
      setErrors({
        ...errors,
        temporada: "La temporada debe ser Verano, Otoño, Invierno o Primavera",
      });
    }
  };

  const validateCountryIds = (value) => {
    if (value.length > 0) {
      setErrors({ ...errors, countryIds: "" });
    } else {
      setErrors({
        ...errors,
        countryIds: "Debes seleccionar al menos un país",
      });
    }
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "nombre") {
      validateNombre(value);
    }

    if (property === "dificultad") {
      validateDificultad(value);
    }

    if (property === "duracion") {
      validateDuracion(value);
    }

    if (property === "temporada") {
      validateTemporada(value);
    }

    if (property === "countryIds") {
      const selectedCountryId = event.target.value;
      const isChecked = event.target.checked;

      if (isChecked) {
        setForm((prevForm) => ({
          ...prevForm,
          countryIds: [...prevForm.countryIds, selectedCountryId],
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          countryIds: prevForm.countryIds.filter(
            (id) => id !== selectedCountryId
          ),
        }));
      }

      setForm((prevForm) => {
        validateCountryIds(prevForm.countryIds);
        return prevForm;
      });
    } else {
      setForm({ ...form, [property]: value });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    validateNombre(form.nombre);
    validateDificultad(form.dificultad);
    validateDuracion(form.duracion);
    validateTemporada(form.temporada);
    validateCountryIds(form.countryIds);

    if (
      errors.nombre ||
      errors.dificultad ||
      errors.duracion ||
      errors.temporada ||
      errors.countryIds
    ) {
      alert("Existen errores en el formulario. No se puede enviar.");
      return;
    }

    axios
      .post("http://localhost:3001/activities", form)
      .then((res) => {
        alert("Actividad creada correctamente");
        setForm({
          nombre: "",
          dificultad: "",
          duracion: "",
          temporada: "",
          countryIds: [],
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error en la solicitud:", error.response.data);
        } else {
          console.error("Error en la solicitud:", error.message);
        }
      });
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
        {errors.nombre && <span>{errors.nombre}</span>}
      </div>
      <div>
        <label>Dificultad:</label>
        <input
          type="text"
          name="dificultad"
          value={form.dificultad}
          onChange={changeHandler}
        />
        {errors.dificultad && <span>{errors.dificultad}</span>}
      </div>
      <div>
        <label>Duración:</label>
        <input
          type="text"
          name="duracion"
          value={form.duracion}
          onChange={changeHandler}
        />
        {errors.duracion && <span>{errors.duracion}</span>}
      </div>
      <div>
        <label>Temporada:</label>
        <input
          type="text"
          name="temporada"
          value={form.temporada}
          onChange={changeHandler}
        />
        {errors.temporada && <span>{errors.temporada}</span>}
      </div>
      <div>
        <label>Países:</label>
        {countries.map((country) => (
          <div key={country.id}>
            <input
              type="checkbox"
              name="countryIds"
              id={`country-${country.id}`}
              value={country.id}
              checked={form.countryIds.includes(country.id)}
              onChange={changeHandler}
            />
            <label htmlFor={`country-${country.id}`}>{country.name}</label>
          </div>
        ))}
        {errors.countryIds && <span>{errors.countryIds}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
