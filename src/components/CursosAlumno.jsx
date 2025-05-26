// components/CursosAlumno.jsx
import React, { useState } from 'react';
import { getCursosAlumno } from '../services/ApiServices';

const CursosAlumno = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [cursos, setCursos] = useState([]);

  const handleBuscarCursos = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    const response = await getCursosAlumno(id, rol);
    setCursos(response.respuesta || []); // Corregido: acceder directamente a `respuesta`
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
              <strong>{curso.nombre_curso || "Curso sin nombre"}</strong>
              {curso.nombre_grupo && <> (Grupo: {curso.nombre_grupo})</>}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '1rem' }}>No hay cursos para mostrar.</p>
      )}
    </div>
  );
};

export default CursosAlumno;
