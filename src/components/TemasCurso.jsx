import React, { useState } from 'react';
import { getTemasCurso } from '../services/ApiServices';

const TemasCurso = () => {
  const [idCurso, setIdCurso] = useState('');
  const [temas, setTemas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleBuscarTemas = async (e) => {
    e.preventDefault();
    const response = await getTemasCurso(idCurso);

    if (!response.error) {
      setTemas(response.respuesta || []);
      setMensaje('');
    } else {
      setTemas([]);
      setMensaje(response.mensajeError || 'Error al obtener los temas.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Temas del Curso</h2>
      <form onSubmit={handleBuscarTemas}>
        <input
          type="number"
          placeholder="ID del curso"
          value={idCurso}
          onChange={(e) => setIdCurso(e.target.value)}
          required
        />
        <button type="submit">Buscar Temas</button>
      </form>

      {mensaje && (
        <p style={{ marginTop: '1rem', color: 'red' }}>{mensaje}</p>
      )}

      {temas.length > 0 ? (
        <ul style={{ marginTop: '1rem' }}>
          {temas.map((tema, index) => (
            <li key={index}>
              <strong>{tema.titulo || 'Tema sin título'}</strong>
            </li>
          ))}
        </ul>
      ) : (
        !mensaje && <p style={{ marginTop: '1rem' }}>No hay temas para mostrar.</p>
      )}
    </div>
  );
};

export default TemasCurso;
