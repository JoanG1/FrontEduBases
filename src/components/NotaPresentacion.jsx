import React, { useState } from 'react';
import { obtenerNota } from '../services/ApiServices';

const NotaPresentacion = () => {
  const [formData, setFormData] = useState({
    idPresentacion: '',
    idAlumno: '',
  });

  const [nota, setNota] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsultarNota = async (e) => {
    e.preventDefault();
    setNota(null);
    setError('');

    try {
      const payload = {
        idPresentacion: parseInt(formData.idPresentacion),
        idAlumno: parseInt(formData.idAlumno),
      };

      const response = await obtenerNota(payload);

      if (!response.error) {
        setNota(response.respuesta ?? 0.0);
      } else {
        setError(`❌ ${response.mensajeError || 'No se pudo obtener la nota'}`);
      }
    } catch (err) {
      setError('❌ Error inesperado al consultar la nota');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Consultar Nota de Presentación</h2>
      <form onSubmit={handleConsultarNota}>
        <input
          type="number"
          name="idPresentacion"
          placeholder="ID Presentación Examen"
          value={formData.idPresentacion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="idAlumno"
          placeholder="ID Alumno"
          value={formData.idAlumno}
          onChange={handleChange}
          required
        />
        <button type="submit">Consultar</button>
      </form>

      {nota !== null && (
        <p style={{ marginTop: '1rem', color: 'green' }}>
          <strong>Nota:</strong> {nota}
        </p>
      )}

      {error && (
        <p style={{ marginTop: '1rem', color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default NotaPresentacion;
