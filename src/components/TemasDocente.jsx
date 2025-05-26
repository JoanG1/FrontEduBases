import React, { useState } from 'react';
import { getAllTemas } from '../services/ApiServices';

const TemasDocente = () => {
  const [temas, setTemas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleCargarTemas = async () => {
    const response = await getAllTemas();

    if (!response.error) {
      setTemas(response.respuesta || []);
      setMensaje('');
    } else {
      setTemas([]);
      setMensaje(response.mensajeError || 'Error al cargar los temas.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Todos los Temas de los Docentes</h2>
      <button onClick={handleCargarTemas}>Cargar Temas</button>

      {mensaje && (
        <p style={{ marginTop: '1rem', color: 'red' }}>{mensaje}</p>
      )}

      {temas.length > 0 ? (
        <ul style={{ marginTop: '1rem' }}>
          {temas.map((tema) => (
            <li key={tema.id_tema}>
              <strong>{tema.titulo || 'Sin título'}</strong>
              <span style={{ display: 'block', color: '#555' }}>ID: {tema.id_tema}</span>
            </li>
          ))}
        </ul>
      ) : (
        !mensaje && <p style={{ marginTop: '1rem' }}>No hay temas cargados.</p>
      )}
    </div>
  );
};

export default TemasDocente;
