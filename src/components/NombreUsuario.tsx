// components/NombreUsuario.jsx
import React, { useState } from 'react';
import { getNombre } from '../services/ApiServices';

const NombreUsuario = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [nombre, setNombre] = useState(null);

  const handleBuscarNombre = async (e) => {
    e.preventDefault();
    //const response = await getNombre(id, rol);
    //setNombre(response.data || 'No se encontró nombre');
  };

  return (
    <div style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <h2>Buscar Nombre de Usuario</h2>
      <form onSubmit={handleBuscarNombre}>
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
        <button type="submit">Buscar</button>
      </form>
      {nombre && <p><strong>Nombre:</strong> {nombre}</p>}
    </div>
  );
};

export default NombreUsuario;
