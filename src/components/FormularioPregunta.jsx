import React, { useState } from "react";
import { crearPregunta } from "../services/ApiServices";

const FormularioPregunta = () => {
  const [formData, setFormData] = useState({
    enunciado: "",
    esPublica: "S",
    tipoPregunta: "SELECCION_MULTIPLE",
    idTema: "",
    idDocente: "",
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
      const pregunta = {
        enunciado: formData.enunciado,
        esPublica: formData.esPublica,
        tipoPregunta: formData.tipoPregunta,
        idTema: Number(formData.idTema),
        idDocente: Number(formData.idDocente),
      };

      //const resultado = await crearPregunta(pregunta);
      //setMensaje("✅ Pregunta creada exitosamente");
    } catch (err) {
      setError("❌ Error al crear la pregunta: " + err.toString());
    }
  };

  return (
    <div>
      <h3>Formulario para Crear Pregunta</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enunciado:</label>
          <textarea
            name="enunciado"
            value={formData.enunciado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>¿Es Pública?</label>
          <select
            name="esPublica"
            value={formData.esPublica}
            onChange={handleChange}
          >
            <option value="S">Sí</option>
            <option value="N">No</option>
          </select>
        </div>
        <div>
          <label>Tipo de Pregunta:</label>
          <select
            name="tipoPregunta"
            value={formData.tipoPregunta}
            onChange={handleChange}
          >
            <option value="SELECCION_MULTIPLE">Selección Múltiple</option>
            <option value="VERDADERO_FALSO">Verdadero/Falso</option>
            <option value="ABIERTA">Abierta</option>
          </select>
        </div>
        <div>
          <label>ID Tema:</label>
          <input
            type="number"
            name="idTema"
            value={formData.idTema}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID Docente:</label>
          <input
            type="number"
            name="idDocente"
            value={formData.idDocente}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Pregunta</button>
      </form>

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormularioPregunta;
