import React, { useState } from "react";
import { obtenerExamenesHechos } from "../services/ApiServices";

const ExamenesHechosAlumno = () => {
  const [formData, setFormData] = useState({
    matriculaAlumno: "",
    idCurso: "",
  });

  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cargarExamenes = async (event) => {
    event.preventDefault();
    setError("");
    setExamenes([]);

    try {
      const data = await obtenerExamenesHechos(
        formData.matriculaAlumno,
        Number(formData.idCurso)
      );
      setExamenes(data || []);
    } catch (err) {
      setError("❌ Error al obtener exámenes: " + err.toString());
    }
  };

  return (
    <div>
      <h3>Ver Exámenes Hechos por Alumno</h3>
      <form onSubmit={cargarExamenes}>
        <div>
          <label>Id del Alumno:</label>
          <input
            type="text"
            name="matriculaAlumno"
            value={formData.matriculaAlumno}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID del Curso:</label>
          <input
            type="number"
            name="idCurso"
            value={formData.idCurso}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Buscar Exámenes</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(examenes) && examenes.length > 0 && (
        <ul>
          {examenes.map((examen, i) => (
            <li key={i}>
              {examen.nombreExamen} - Calificación: {examen.calificacion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamenesHechosAlumno;
