import React, { useState } from "react";
import { crearExamen } from "../services/ApiServices";

const FormularioExamen = () => {
  const [formData, setFormData] = useState({
    tiempo_max: "",
    numero_preguntas: "",
    porcentajeCurso: "",
    nombre: "",
    porcentaje_aprobatorio: "",
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    num_preguntas_aleatorias: "",
    id_tema: "",
    id_docente: "",
    id_grupo: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const examen = {
        tiempo_max: Number(formData.tiempo_max),
        numero_preguntas: Number(formData.numero_preguntas),
        porcentajeCurso: Number(formData.porcentajeCurso),
        nombre: formData.nombre,
        porcentaje_aprobatorio: Number(formData.porcentaje_aprobatorio),
        fecha_hora_inicio: new Date(formData.fecha_hora_inicio),
        fecha_hora_fin: new Date(formData.fecha_hora_fin),
        num_preguntas_aleatorias: Number(formData.num_preguntas_aleatorias),
        id_tema: Number(formData.id_tema),
        id_docente: Number(formData.id_docente),
        id_grupo: Number(formData.id_grupo),
      };

      const respuesta = await crearExamen(examen);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ Ocurrió un error al crear el examen: ${err}`);
    }
  };

  return (
    <div>
      <h3>Formulario para Crear Examen</h3>
      <form onSubmit={handleSubmit}>
        <div><label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div><label>Tiempo Máximo (min):</label>
          <input type="number" name="tiempo_max" value={formData.tiempo_max} onChange={handleChange} required />
        </div>
        <div><label>Número de Preguntas:</label>
          <input type="number" name="numero_preguntas" value={formData.numero_preguntas} onChange={handleChange} required />
        </div>
        <div><label>Porcentaje del Curso:</label>
          <input type="number" name="porcentajeCurso" value={formData.porcentajeCurso} onChange={handleChange} required />
        </div>
        <div><label>Porcentaje Aprobatorio:</label>
          <input type="number" name="porcentaje_aprobatorio" value={formData.porcentaje_aprobatorio} onChange={handleChange} required />
        </div>
        <div><label>Fecha y Hora de Inicio:</label>
          <input type="datetime-local" name="fecha_hora_inicio" value={formData.fecha_hora_inicio} onChange={handleChange} required />
        </div>
        <div><label>Fecha y Hora de Fin:</label>
          <input type="datetime-local" name="fecha_hora_fin" value={formData.fecha_hora_fin} onChange={handleChange} required />
        </div>
        <div><label>Número de Preguntas Aleatorias:</label>
          <input type="number" name="num_preguntas_aleatorias" value={formData.num_preguntas_aleatorias} onChange={handleChange} required />
        </div>
        <div><label>ID Tema:</label>
          <input type="number" name="id_tema" value={formData.id_tema} onChange={handleChange} required />
        </div>
        <div><label>ID Docente:</label>
          <input type="number" name="id_docente" value={formData.id_docente} onChange={handleChange} required />
        </div>
        <div><label>ID Grupo:</label>
          <input type="number" name="id_grupo" value={formData.id_grupo} onChange={handleChange} required />
        </div>
        <button type="submit">Crear Examen</button>
      </form>

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormularioExamen;
