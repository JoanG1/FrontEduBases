// components/CursosUsuario.jsx
import React, { useState } from 'react';
import { getCursos } from '../services/ApiServices';

const CursosUsuario = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [cursos, setCursos] = useState([]);

  const handleBuscarCursos = async () => {
    const response = await getCursos(id, rol);
    setCursos(response.data.respuesta || []);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Consultar Cursos</h2>
      <form onSubmit={handleBuscarCursos}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          required
        />
        <button type="submit">Buscar Cursos</button>
      </form>

      {cursos.length > 0 ? (
        <ul style={{ marginTop: '1rem' }}>
          {cursos.map((curso, index) => (
            <li key={index}>
              <strong>{curso.nombre_curso ||"Curso sin nombre"}</strong>
              {curso.id_grupo && <> (Código: {curso.nombre_grupo})</>}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '1rem' }}>No hay cursos para mostrar.</p>
      )}
    </div>
  );
};

export default CursosUsuario;
