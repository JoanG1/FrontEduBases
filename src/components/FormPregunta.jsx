import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { guardarPregunta } from "../services/ApiServices";

const FormPregunta = () => {
  const [pregunta, setPregunta] = useState({
    enunciado: "",
    es_publica: "S",
    tipo_pregunta: "SELECCION_MULTIPLE",
    id_tema: "",
    id_docente: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPregunta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const preguntaDTO = {
      ...pregunta,
      es_publica: pregunta.es_publica === "S" ? "S" : "N",
      id_tema: parseInt(pregunta.id_tema),
      id_docente: parseInt(pregunta.id_docente),
    };

    try {
      const response = await guardarPregunta(preguntaDTO);
      if (!response.error) {
        setMensaje(`✅ ${response.respuesta}`);
      } else {
        setError(`❌ ${response.mensajeError || "No se pudo guardar la pregunta"}`);
      }
    } catch (err) {
      setError("❌ Error inesperado al guardar la pregunta");
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
        Crear Nueva Pregunta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Enunciado"
          name="enunciado"
          value={pregunta.enunciado}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="publica-label">Visibilidad</InputLabel>
          <Select
            labelId="publica-label"
            name="es_publica"
            value={pregunta.es_publica}
            onChange={handleChange}
            label="Visibilidad"
          >
            <MenuItem value="S">Pública</MenuItem>
            <MenuItem value="N">Privada</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="tipo-label">Tipo de Pregunta</InputLabel>
          <Select
            labelId="tipo-label"
            name="tipo_pregunta"
            value={pregunta.tipo_pregunta}
            onChange={handleChange}
            required
            label="Tipo de Pregunta"
          >
            <MenuItem value="SELECCION_MULTIPLE">Selección Múltiple</MenuItem>
            <MenuItem value="VERDADERO_FALSO">Verdadero/Falso</MenuItem>
            <MenuItem value="ABIERTA">Abierta</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="ID del Tema"
          name="id_tema"
          type="number"
          value={pregunta.id_tema}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Docente"
          name="id_docente"
          type="number"
          value={pregunta.id_docente}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar Pregunta
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

export default FormPregunta;
