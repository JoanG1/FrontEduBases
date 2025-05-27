import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
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
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Crear Examen
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Tiempo Máximo (min)"
          name="tiempo_max"
          type="number"
          value={formData.tiempo_max}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Número de Preguntas"
          name="numero_preguntas"
          type="number"
          value={formData.numero_preguntas}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Porcentaje del Curso"
          name="porcentajeCurso"
          type="number"
          value={formData.porcentajeCurso}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Porcentaje Aprobatorio"
          name="porcentaje_aprobatorio"
          type="number"
          value={formData.porcentaje_aprobatorio}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Fecha y Hora de Inicio"
          name="fecha_hora_inicio"
          type="datetime-local"
          value={formData.fecha_hora_inicio}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />

        <TextField
          label="Fecha y Hora de Fin"
          name="fecha_hora_fin"
          type="datetime-local"
          value={formData.fecha_hora_fin}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />

        <TextField
          label="Número de Preguntas Aleatorias"
          name="num_preguntas_aleatorias"
          type="number"
          value={formData.num_preguntas_aleatorias}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Tema"
          name="id_tema"
          type="number"
          value={formData.id_tema}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Docente"
          name="id_docente"
          type="number"
          value={formData.id_docente}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Grupo"
          name="id_grupo"
          type="number"
          value={formData.id_grupo}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear Examen
        </Button>
      </Box>

      {mensaje && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default FormularioExamen;
