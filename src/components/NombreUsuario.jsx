import React, { useState } from 'react';
import { getNombre } from '../services/ApiServices';

const NombreUsuario = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [nombre, setNombre] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleBuscarNombre = async (e) => {
    e.preventDefault();
    const response = await getNombre(id, rol);

    if (!response.error) {
      setNombre(response.respuesta || 'Nombre no disponible');
      setMensaje('');
    } else {
      setNombre(null);
      setMensaje(response.mensajeError || 'Error al buscar el nombre');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <h2>Buscar Nombre de Docente</h2>
      <form onSubmit={handleBuscarNombre}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          style={{ marginBottom: '0.5rem', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Rol"
          value={"docente"}
          onChange={(e) => setRol(e.target.value)}
          required
          style={{ marginBottom: '0.5rem', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>Buscar</button>
      </form>

      {mensaje && <p style={{ color: 'red', marginTop: '1rem' }}>{mensaje}</p>}
      {nombre && <p style={{ marginTop: '1rem' }}><strong>Nombre:</strong> {nombre}</p>}
    </div>
  );
};

export default NombreUsuario;
