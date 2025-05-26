import React, { useState } from "react";
import { obtenerExamenesDocente } from "../services/ApiServices";

const ListaExamenesDocente = () => {
  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState("");

  const cargarExamenes = async () => {
    try {
      //const resultado = await obtenerExamenesDocente(123); // Reemplaza con el ID real
      //setExamenes(resultado);
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div>
      <button onClick={cargarExamenes}>Cargar exámenes del docente</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {examenes.map((examen, i) => (
          <li key={i}>
            {/*examen.nombre*/} - {/*examen.fechaCreacion*/}
          </li>
        ))}
        <li>Examen #1</li>
        <li>Examen #2</li>
      </ul>
    </div>
  );
};

export default ListaExamenesDocente;
