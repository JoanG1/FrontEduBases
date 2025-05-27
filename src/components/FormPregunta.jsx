import React, { useState } from 'react';
import { guardarPregunta } from '../services/ApiServices';

const FormPregunta = () => {
  const [pregunta, setPregunta] = useState({
    enunciado: '',
    es_publica: 'S',
    tipo_pregunta: 'SELECCION_MULTIPLE',
    id_tema: '',
    id_docente: '',
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPregunta({ ...pregunta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const preguntaDTO = {
      ...pregunta,
      es_publica: pregunta.es_publica === 'S' ? 'S' : 'N',
      id_tema: parseInt(pregunta.id_tema),
      id_docente: parseInt(pregunta.id_docente),
    };

    try {
      const response = await guardarPregunta(preguntaDTO);

      if (!response.error) {
        setMensaje(`✅ ${response.respuesta}`);
      } else {
        setError(`❌ ${response.mensajeError || 'No se pudo guardar la pregunta'}`);
      }
    } catch (err) {
      setError('❌ Error inesperado al guardar la pregunta');
    }
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
          <option value="S">Pública</option>
          <option value="N">Privada</option>
        </select>
        <select
          name="tipo_pregunta"
          value={pregunta.tipo_pregunta}
          onChange={handleChange}
          required
        >
          <option value="SELECCION_MULTIPLE">Selección Múltiple</option>
          <option value="VERDADERO_FALSO">Verdadero/Falso</option>
          <option value="ABIERTA">Abierta</option>
        </select>
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

      {mensaje && <p style={{ color: 'green', marginTop: '1rem' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default FormPregunta;
