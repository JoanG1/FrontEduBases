// components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/ApiServices';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginDTO = { id, rol };
      const response = await login(loginDTO);

      // Extraer mensaje del backend / Extract message from backend
      if (response.error === false && response.respuesta === true) {
        setMensaje(response.mensajeError); // Usuario correcto / Correct user
        if(rol == "alumno"){
          navigate("/dashboard-Alumno")
        }else{
          navigate("/dashboard")
        }
      } else {
        setMensaje('Acceso denegado'); // En caso de fallo / If login fails
      }

      console.log(response); // Mostrar respuesta completa / Log full response
    } catch (error) {
      setMensaje('Error en la conexión');
      console.error('Error al iniciar sesión:', error);
    }
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
