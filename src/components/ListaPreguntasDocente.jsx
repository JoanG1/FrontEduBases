import React, { useState } from "react";
import { obtenerPreguntasDocente } from "../services/ApiServices";

const ListaPreguntasDocente = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState("");

  const cargarPreguntas = async () => {
    try {
      //const resultado = await obtenerPreguntasDocente(123); // Reemplaza con ID real
      //setPreguntas(resultado);
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div>
      <button onClick={cargarPreguntas}>Cargar preguntas del docente</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {preguntas.map((p, i) => (
          <li key={i}>{}</li>
        ))}
        <li key={1}>pregunta # 1</li>
        <li key={2}>pregunta # 2</li>
      </ul>
    </div>
  );
};

export default ListaPreguntasDocente;
