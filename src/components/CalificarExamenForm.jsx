import React, { useState } from "react";
import { calificarExamen } from "../services/ApiServices";

const CalificarExamenForm = () => {
  const [formData, setFormData] = useState({
    idPresentacionExamen: "",
    calificacion: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const data = {
        idPresentacionExamen: Number(formData.idPresentacionExamen),
        calificacion: Number(formData.calificacion),
      };

      //const resultado = await calificarExamen(data);
      //setMensaje(`✅ Examen calificado - ID: ${data.idPresentacionExamen}, Calificación: ${data.calificacion}`);
    } catch (err) {
      setError("❌ No se pudo calificar el examen: " + err.toString());
    }
  };

  return (
    <div>
      <h3>Formulario de Calificación de Examen</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Presentación Examen:</label>
          <input
            type="number"
            name="idPresentacionExamen"
            value={formData.idPresentacionExamen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Calificación:</label>
          <input
            type="number"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Calificar</button>
      </form>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CalificarExamenForm;
