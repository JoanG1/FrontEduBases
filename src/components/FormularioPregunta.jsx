import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { crearPregunta } from "../services/ApiServices";

const FormularioPregunta = () => {
  const [formData, setFormData] = useState({
    enunciado: "",
    esPublica: "S",
    tipoPregunta: "SELECCION_MULTIPLE",
    idTema: "",
    idDocente: "",
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
      const pregunta = {
        enunciado: formData.enunciado,
        esPublica: formData.esPublica,
        tipoPregunta: formData.tipoPregunta,
        idTema: Number(formData.idTema),
        idDocente: Number(formData.idDocente),
      };

      const respuesta = await crearPregunta(pregunta);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ Error al crear la pregunta: ${err}`);
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
        Crear Pregunta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Enunciado"
          name="enunciado"
          value={formData.enunciado}
          onChange={handleChange}
          multiline
          rows={4}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="publica-label">¿Es Pública?</InputLabel>
          <Select
            labelId="publica-label"
            name="esPublica"
            value={formData.esPublica}
            onChange={handleChange}
            label="¿Es Pública?"
          >
            <MenuItem value="S">Sí</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="tipo-label">Tipo de Pregunta</InputLabel>
          <Select
            labelId="tipo-label"
            name="tipoPregunta"
            value={formData.tipoPregunta}
            onChange={handleChange}
            label="Tipo de Pregunta"
          >
            <MenuItem value="SELECCION_MULTIPLE">Selección Múltiple</MenuItem>
            <MenuItem value="VERDADERO_FALSO">Verdadero/Falso</MenuItem>
            <MenuItem value="ABIERTA">Abierta</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="ID del Tema"
          name="idTema"
          type="number"
          value={formData.idTema}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Docente"
          name="idDocente"
          type="number"
          value={formData.idDocente}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear Pregunta
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

export default FormularioPregunta;
