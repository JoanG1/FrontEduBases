import React, { useState } from "react";
import { obtenerExamenesPendientes } from "../services/ApiServices";

const ExamenesPendientesAlumno = () => {
  const [formData, setFormData] = useState({
    matriculaAlumno: "",
    idCurso: "",
  });

  const [pendientes, setPendientes] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cargarPendientes = async (e) => {
    e.preventDefault();
    setError("");
    setPendientes([]);

    try {
      /*const data = await obtenerExamenesPendientes(
        formData.matriculaAlumno,
        Number(formData.idCurso)
      );
      setPendientes(data);*/
    } catch (err) {
      setError("❌ Error al obtener exámenes pendientes: " + err.toString());
    }
  };

  return (
    <div>
      <h3>Exámenes Pendientes del Alumno</h3>
      <form onSubmit={cargarPendientes}>
        <div>
          <label>ID del Alumno:</label>
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
        <button type="submit">Buscar Pendientes</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pendientes.length > 0 && (
        <ul>
          {pendientes.map((examen, i) => (
            <li key={i}>
              {/*examen.nombre*/} - Fecha Límite: {/*examen.fechaLimite*/}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamenesPendientesAlumno;
