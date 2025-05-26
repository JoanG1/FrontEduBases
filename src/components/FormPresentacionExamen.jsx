import React, { useState } from 'react';
import { presentarExamen } from '../services/ApiServices';

const FormPresentacionExamen = () => {
  const [presentacion, setPresentacion] = useState({
    tiempo: '',
    terminado: '0',
    ipSource: '',
    fechaHoraPresentacion: '',
    idExamen: '',
    idAlumno: '',
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPresentacion({ ...presentacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const presentacionDTO = {
      ...presentacion,
      tiempo: parseInt(presentacion.tiempo),
      terminado: presentacion.terminado === '1' ? '1' : '0',
      idExamen: parseInt(presentacion.idExamen),
      idAlumno: parseInt(presentacion.idAlumno),
      fechaHoraPresentacion: new Date(presentacion.fechaHoraPresentacion),
    };

    try {
      const response = await presentarExamen(presentacionDTO);
      if (!response.error) {
        setMensaje(`✅ ${response.respuesta}`);
      } else {
        setError(`❌ ${response.mensajeError}`);
      }
    } catch (err) {
      setError(`❌ Error inesperado al presentar el examen`);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Presentar Examen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="tiempo"
          placeholder="Tiempo (min)"
          value={presentacion.tiempo}
          onChange={handleChange}
          required
        />
        <select name="terminado" value={presentacion.terminado} onChange={handleChange}>
          <option value="0">No terminado</option>
          <option value="1">Terminado</option>
        </select>
        <input
          type="text"
          name="ipSource"
          placeholder="IP del dispositivo"
          value={presentacion.ipSource}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="fechaHoraPresentacion"
          placeholder="Fecha y Hora"
          value={presentacion.fechaHoraPresentacion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="idExamen"
          placeholder="ID Examen"
          value={presentacion.idExamen}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="idAlumno"
          placeholder="ID Alumno"
          value={presentacion.idAlumno}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {mensaje && <p style={{ color: 'green', marginTop: '1rem' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default FormPresentacionExamen;
