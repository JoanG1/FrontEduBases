// components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/ApiServices';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginDTO = { id, rol };
    //const response = await login(loginDTO);
    //setMensaje(response.mensaje || 'Respuesta inesperada');
  };

  return (
    <div style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default LoginForm;
