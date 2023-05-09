import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByActivity } from "../../redux/actions";

const FilterByActivity = () => {
  const activities = useSelector((state) => state.allActivities);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedActivity = event.target.value;
    dispatch(filterByActivity(selectedActivity));
  };

  return (
    <select onChange={handleChange}>
      <option value="">Todos los Paises</option>
      {activities.map((activity) => (
        <option key={activity.id} value={activity.nombre}>
          {activity.nombre}
        </option>
      ))}
    </select>
  );
};

export default FilterByActivity;
