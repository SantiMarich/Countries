import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryId: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryId: "",
  });

  const validateDuracion = (form) => {
    if (form.duracion >= 1 && form.duracion <= 24) {
      setErrors({...errors, duracion:""});
    } else {
      setErrors({...errors, duracion:"La duracion debe ser entre 1 - 24 horas"});
    }
    if (form.duracion === "") {setErrors({...errors, duracion:"Campo Obligatorio"})}
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validateDuracion({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault()
    axios.post("http://localhost:3001/activities", form)
    .then(res=>alert(res))
    .catch(error=>alert(error))
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={form.nombre}
          onChange={changeHandler}
          name="nombre"
        ></input>
        <span>{errors.nombre}</span>
      </div>
      <div>
        <label>Dificultad</label>
        <input
          type="text"
          value={form.dificultad}
          onChange={changeHandler}
          name="dificultad"
        ></input>
        <span>{errors.dificultad}</span>
      </div>
      <div>
        <label>Duracion</label>
        <input
          type="text"
          value={form.duracion}
          onChange={changeHandler}
          name="duracion"
        ></input>
        <span>{errors.duracion}</span>
      </div>
      <div>
        <label>Temporada</label>
        <input
          type="text"
          value={form.temporada}
          onChange={changeHandler}
          name="temporada"
        ></input>
        <span>{errors.temporada}</span>
      </div>
      <div>
        <label>ID Pais</label>
        <input
          type="text"
          value={form.countryId}
          onChange={changeHandler}
          name="countryId"
        ></input>
        <span>{errors.countryId}</span>
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default Form;
