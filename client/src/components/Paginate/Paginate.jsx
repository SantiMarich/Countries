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
    <div>
      <button onClick={handlePrimeraPagina} className={style.butn}>
        {"<<"}
      </button>
      <button onClick={handlePaginaAnterior} className={style.butn}>
        {"<"}
      </button>
      <button onClick={handlePaginaSiguiente} className={style.butn}>
        {">"}
      </button>
      <button onClick={handleUltimaPagina} className={style.butn}>
        {">>"}
      </button>
    </div>
  );
};

export default Paginate;
