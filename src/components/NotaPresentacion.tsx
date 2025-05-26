// components/NotaPresentacion.jsx
import React, { useState } from 'react';
import { obtenerNota } from '../services/ApiServices';

const NotaPresentacion = () => {
  const [idPresentacion, setIdPresentacion] = useState('');
  const [nota, setNota] = useState(null);

  const handleConsultarNota = async (e) => {
    e.preventDefault();
    const id = parseInt(idPresentacion);
    //const response = await obtenerNota(id);
    //setNota(response.data ?? 0.0);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Consultar Nota de Presentación</h2>
      <form onSubmit={handleConsultarNota}>
        <input
          type="number"
          placeholder="ID Presentación Examen"
          value={idPresentacion}
          onChange={(e) => setIdPresentacion(e.target.value)}
          required
        />
        <button type="submit">Consultar</button>
      </form>

      {nota !== null && (
        <p style={{ marginTop: '1rem' }}>
          <strong>Nota:</strong> {nota}
        </p>
      )}
    </div>
  );
};

export default NotaPresentacion;
