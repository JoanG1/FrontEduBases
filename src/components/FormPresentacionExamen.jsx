// components/FormPresentacionExamen.jsx
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

  const handleChange = (e) => {
    setPresentacion({ ...presentacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const presentacionDTO = {
      ...presentacion,
      tiempo: parseInt(presentacion.tiempo),
      terminado: presentacion.terminado === '1' ? '1' : '0',
      idExamen: parseInt(presentacion.idExamen),
      idAlumno: parseInt(presentacion.idAlumno),
      fechaHoraPresentacion: new Date(presentacion.fechaHoraPresentacion),
    };

    //const response = await presentarExamen(presentacionDTO);
    //setMensaje(response.data || response.mensaje);
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

      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
    </div>
  );
};

export default FormPresentacionExamen;
