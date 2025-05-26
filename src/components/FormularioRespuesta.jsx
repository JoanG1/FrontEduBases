import React, { useState } from "react";
import { crearRespuesta } from "../services/ApiServices";

const FormularioRespuesta = () => {
  const [descripcion, setDescripcion] = useState("");
  const [esVerdadera, setEsVerdadera] = useState("S"); // "S" o "N"
  const [idPregunta, setIdPregunta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const data = {
        descripcion,
        esVerdadera,
        id_pregunta: Number(idPregunta),
      };

      const respuesta = await crearRespuesta(data);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ Hubo un error al crear la respuesta: ${err}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Descripción:</label>
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
        />
      </div>
      <div>
        <label>¿Es Verdadera?</label>
        <select value={esVerdadera} onChange={(e) => setEsVerdadera(e.target.value)}>
          <option value="S">Sí</option>
          <option value="N">No</option>
        </select>
      </div>
      <div>
        <label>ID Pregunta:</label>
        <input
          type="number"
          value={idPregunta}
          onChange={(e) => setIdPregunta(e.target.value)}
          placeholder="ID Pregunta"
          required
        />
      </div>
      <button type="submit">Enviar</button>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default FormularioRespuesta;
