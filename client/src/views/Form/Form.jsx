import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getActivities } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Form.module.css";

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
    <div className={style.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={style.form}>
          <label className={style.labels}>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={changeHandler}
            className={style.inputs}
          />
          {errors.nombre && (
            <span className={style.errors}>{errors.nombre}</span>
          )}
        </div>
        <div className={style.form}>
          <label className={style.labels}>Dificultad</label>
          <input
            type="text"
            name="dificultad"
            value={form.dificultad}
            onChange={changeHandler}
            className={style.inputs}
          />
          {errors.dificultad && (
            <span className={style.errors}>{errors.dificultad}</span>
          )}
        </div>
        <div className={style.form}>
          <label className={style.labels}>Duración</label>
          <input
            type="text"
            name="duracion"
            value={form.duracion}
            onChange={changeHandler}
            className={style.inputs}
          />
          {errors.duracion && (
            <span className={style.errors}>{errors.duracion}</span>
          )}
        </div>
        <div className={style.form}>
          <label className={style.labels}>Temporada</label>
          <input
            type="text"
            name="temporada"
            value={form.temporada}
            onChange={changeHandler}
            className={style.inputs}
          />
          {errors.temporada && (
            <span className={style.errors}>{errors.temporada}</span>
          )}
        </div>
        <div className={style.scrollContainer}>
          <div className={style.checkboxContainer}>
            {countries.map((country) => (
              <div key={country.id}>
                <input
                  className={style.inputCheck}
                  type="checkbox"
                  name="countryIds"
                  id={`country-${country.id}`}
                  value={country.id}
                  checked={form.countryIds.includes(country.id)}
                  onChange={changeHandler}
                />
                <label
                  htmlFor={`country-${country.id}`}
                  className={style.nombrePais}
                >
                  {country.name}
                </label>
              </div>
            ))}
            {errors.countryIds && (
              <span className={style.errors}>{errors.countryIds}</span>
            )}
          </div>
        </div>
        <div className={style.buttonContainer}>
          <button type="submit" className={style.buttonCrear}>
            CREAR ACTIVIDAD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
