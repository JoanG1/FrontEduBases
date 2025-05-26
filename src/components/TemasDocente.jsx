// components/TemasDocente.jsx
import React, { useState } from 'react';
import { getAllTemas } from '../services/ApiServices';

const TemasDocente = () => {
  const [temas, setTemas] = useState([]);

  const handleCargarTemas = async () => {
    //const response = await getAllTemas();
    //setTemas(response.data || []);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Todos los Temas del Docente</h2>
      <button onClick={handleCargarTemas}>Cargar Temas</button>

      {temas.length > 0 ? (
        <ul style={{ marginTop: '1rem' }}>
          {temas.map((tema, index) => (
            <li key={index}>
              <strong>{/*tema.nombre ||*/ "Sin nombre"}</strong>
              <span style={{ display: 'block', color: '#555' }}>ID: {/*tema.codigo*/}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '1rem' }}>No hay temas cargados.</p>
      )}
    </div>
  );
};

export default TemasDocente;
