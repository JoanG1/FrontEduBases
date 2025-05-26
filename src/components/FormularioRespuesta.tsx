import React, { useState } from "react";
import { crearRespuesta } from "../services/ApiServices";

const FormularioRespuesta = () => {
  const [descripcion, setDescripcion] = useState("");
  const [esVerdadera, setEsVerdadera] = useState("S"); // o 'N'
  const [idPregunta, setIdPregunta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /*const resultado = await crearRespuesta({
        descripcion,
        esVerdadera,
        id_pregunta: parseInt(idPregunta)
      });
      setMensaje(resultado);*/
      console.log(descripcion, esVerdadera, idPregunta)
    } catch (err) {
      setMensaje("Hubo un error al crear la respuesta.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
      <select value={esVerdadera} onChange={(e) => setEsVerdadera(e.target.value)}>
        <option value="S">Sí</option>
        <option value="N">No</option>
      </select>
      <input value={idPregunta} onChange={(e) => setIdPregunta(e.target.value)} placeholder="ID Pregunta" />
      <button type="submit">Enviar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default FormularioRespuesta;
