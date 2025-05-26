import React, { useState } from 'react';
import { getCursos } from '../services/ApiServices';

const CursosUsuario = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [cursos, setCursos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleBuscarCursos = async (e) => {
    e.preventDefault(); // Prevenir recarga
    const response = await getCursos(id, rol);

    if (!response.error) {
      setCursos(response.respuesta || []);
      setMensaje('');
    } else {
      setCursos([]);
      setMensaje(response.mensajeError || 'Error al obtener los cursos.');
    }
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

      {mensaje && (
        <p style={{ marginTop: '1rem', color: 'red' }}>{mensaje}</p>
      )}

      {cursos.length > 0 ? (
        <ul style={{ marginTop: '1rem' }}>
          {cursos.map((curso, index) => (
            <li key={index}>
              <strong>{curso.nombre_curso || 'Curso sin nombre'}</strong>
              {curso.nombre_grupo && <> (Grupo: {curso.nombre_grupo})</>}
            </li>
          ))}
        </ul>
      ) : (
        !mensaje && <p style={{ marginTop: '1rem' }}>No hay cursos para mostrar.</p>
      )}
    </div>
  );
};

export default CursosUsuario;
