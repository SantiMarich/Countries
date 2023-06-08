import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByActivity } from "../../redux/actions";
import style from "./FilterByActivity.module.css";

const FilterByActivity = () => {
  const activities = useSelector((state) => state.allActivities);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedActivity = event.target.value;
    dispatch(filterByActivity(selectedActivity));
  };

  return (
    <select onChange={handleChange} className={style.selector}>
      <option value="">Filtrar Actividades</option>
      {activities.map((activity) => (
        <option key={activity.id} value={activity.nombre}>
          {activity.nombre}
        </option>
      ))}
    </select>
  );
};

export default FilterByActivity;
