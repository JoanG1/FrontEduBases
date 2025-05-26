import React, { useState } from "react";
import { agregarPreguntaExamen } from "../services/ApiServices";

const AgregarPreguntaExamen = () => {
  const [formData, setFormData] = useState({
    porcentajeExamen: "",
    tiempoPregunta: "",
    tieneTiempoMaximo: "S",
    idPregunta: "",
    idExamen: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const dto = {
        porcentajeExamen: Number(formData.porcentajeExamen),
        tiempoPregunta: Number(formData.tiempoPregunta),
        tieneTiempoMaximo: formData.tieneTiempoMaximo,
        idPregunta: Number(formData.idPregunta),
        idExamen: Number(formData.idExamen),
      };

      const respuesta = await agregarPreguntaExamen(dto);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ Error al agregar pregunta: ${err}`);
    }
  };

  return (
    <div>
      <h3>Agregar Pregunta al Examen</h3>
      <form onSubmit={handleAgregar}>
        <div>
          <label>Porcentaje Examen:</label>
          <input
            type="number"
            name="porcentajeExamen"
            value={formData.porcentajeExamen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tiempo Pregunta (segundos):</label>
          <input
            type="number"
            name="tiempoPregunta"
            value={formData.tiempoPregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tiene Tiempo Máximo (S/N):</label>
          <select
            name="tieneTiempoMaximo"
            value={formData.tieneTiempoMaximo}
            onChange={handleChange}
          >
            <option value="S">Sí</option>
            <option value="N">No</option>
          </select>
        </div>
        <div>
          <label>ID Pregunta:</label>
          <input
            type="number"
            name="idPregunta"
            value={formData.idPregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID Examen:</label>
          <input
            type="number"
            name="idExamen"
            value={formData.idExamen}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AgregarPreguntaExamen;
