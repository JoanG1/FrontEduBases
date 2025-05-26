// components/FormPregunta.jsx
import React, { useState } from 'react';
import { guardarPregunta } from '../services/ApiServices';

const FormPregunta = () => {
  const [pregunta, setPregunta] = useState({
    enunciado: '',
    es_publica: '1',
    tipo_pregunta: '',
    id_tema: '',
    id_docente: '',
  });
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setPregunta({ ...pregunta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preguntaDTO = {
      ...pregunta,
      es_publica: pregunta.es_publica === '1' ? '1' : '0',
      id_tema: parseInt(pregunta.id_tema),
      id_docente: parseInt(pregunta.id_docente),
    };

    //const response = await guardarPregunta(preguntaDTO);
    //setMensaje(response.data || response.mensaje);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Crear Pregunta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="enunciado"
          placeholder="Enunciado"
          value={pregunta.enunciado}
          onChange={handleChange}
          required
        />
        <select name="es_publica" value={pregunta.es_publica} onChange={handleChange}>
          <option value="1">Pública</option>
          <option value="0">Privada</option>
        </select>
        <input
          type="text"
          name="tipo_pregunta"
          placeholder="Tipo de Pregunta"
          value={pregunta.tipo_pregunta}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="id_tema"
          placeholder="ID del Tema"
          value={pregunta.id_tema}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="id_docente"
          placeholder="ID del Docente"
          value={pregunta.id_docente}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar Pregunta</button>
      </form>

      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
    </div>
  );
};

export default FormPregunta;
