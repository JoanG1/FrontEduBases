import React, { useState } from "react";
import { obtenerExamenesDocente } from "../services/ApiServices";

const ListaExamenesDocente = () => {
  const [idDocente, setIdDocente] = useState("");
  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState("");

  const cargarExamenes = async () => {
    if (!idDocente.trim()) {
      setError("Por favor ingresa un ID de docente.");
      setExamenes([]);
      return;
    }

    try {
      const resultado = await obtenerExamenesDocente(idDocente);
      setExamenes(resultado);
      setError("");
    } catch (err) {
      setError(err.toString());
      setExamenes([]);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Lista de Exámenes del Docente</h2>

      <input
        type="text"
        placeholder="ID del docente"
        value={idDocente}
        onChange={(e) => setIdDocente(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <button onClick={cargarExamenes} style={{ marginBottom: '1rem' }}>
        Cargar exámenes
      </button>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      {examenes.length > 0 ? (
        <ul>
          {examenes.map((examen) => (
            <li key={examen.id_examen}>
              <strong>{examen.nombre}</strong> - {examen.fecha_hora_inicio} | {examen.estado}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No hay exámenes disponibles.</p>
      )}
    </div>
  );
};

export default ListaExamenesDocente;
