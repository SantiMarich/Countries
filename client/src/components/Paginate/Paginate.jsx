import React from "react";
import style from "./Paginate.module.css";

const Paginate = ({
  totalPaises,
  paisesPorPagina,
  paginaActual,
  onPageChange,
}) => {
  const totalPaginas = Math.ceil(totalPaises / paisesPorPagina);

  const handlePrimeraPagina = () => {
    onPageChange(0);
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 0) {
      onPageChange(paginaActual - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas - 1) {
      onPageChange(paginaActual + 1);
    }
  };

  const handleUltimaPagina = () => {
    onPageChange(totalPaginas - 1);
  };

  return (
    <div className={style.paginate}>
      <button onClick={handlePrimeraPagina} className={style.pagecontrol}>
        {"◄◄"}
      </button>
      <button onClick={handlePaginaAnterior} className={style.pagecontrol}>
        {"◄"}
      </button>
      <div className={style.pagecontrolnumber}>
        {paginaActual + 1} de {totalPaginas}
      </div>
      <button onClick={handlePaginaSiguiente} className={style.pagecontrol}>
        {"►"}
      </button>
      <button onClick={handleUltimaPagina} className={style.pagecontrol}>
        {"►►"}
      </button>
    </div>
  );
};

export default Paginate;
