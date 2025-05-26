// components/TemasCurso.jsx
import React, { useState } from 'react';
import { getTemasCurso } from '../services/ApiServices';

const TemasCurso = () => {
  const [idCurso, setIdCurso] = useState('');
  const [temas, setTemas] = useState([]);

  const handleBuscarTemas = async (e) => {
    e.preventDefault();
    //const response = await getTemasCurso(idCurso);
    //setTemas(response.data || []);
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

      {temas.length > 0 ? (
        <ul style={{ marginTop: '1rem' }}>
          {temas.map((tema, index) => (
            <li key={index}>
              <strong>{/*tema.nombre ||*/ "Tema sin nombre"}</strong>
              {/*tema.descripcion &&*/ <p>{/*tema.descripcion*/}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '1rem' }}>No hay temas para mostrar.</p>
      )}
    </div>
  );
};

export default TemasCurso;
