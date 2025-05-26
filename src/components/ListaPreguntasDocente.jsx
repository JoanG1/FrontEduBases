import React, { useState } from "react";
import { obtenerPreguntasDocente } from "../services/ApiServices";

const ListaPreguntasDocente = () => {
  const [idDocente, setIdDocente] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState("");

  const cargarPreguntas = async () => {
    if (!idDocente.trim()) {
      setError("Por favor ingresa un ID de docente.");
      setPreguntas([]);
      return;
    }

    try {
      const resultado = await obtenerPreguntasDocente(idDocente);
      setPreguntas(resultado);
      setError("");
    } catch (err) {
      setError(err.toString());
      setPreguntas([]);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Preguntas del Docente</h2>

      <input
        type="text"
        placeholder="ID del docente"
        value={idDocente}
        onChange={(e) => setIdDocente(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <button onClick={cargarPreguntas} style={{ marginBottom: '1rem' }}>
        Cargar preguntas
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {preguntas.length > 0 ? (
        <ul>
          {preguntas.map((p) => (
            <li key={p.id_pregunta}>
              <strong>{p.enunciado}</strong> <br />
              Tipo: {p.tipo_pregunta} | Pública: {p.es_publica === "S" ? "Sí" : "No"}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No hay preguntas disponibles.</p>
      )}
    </div>
  );
};

export default ListaPreguntasDocente;
