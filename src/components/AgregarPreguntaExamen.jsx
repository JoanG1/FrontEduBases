import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { agregarPreguntaExamen } from "../services/ApiServices";

const AgregarPreguntaExamen = () => {
  const [formData, setFormData] = useState({
    porcentajeExamen: "",
    tiempoPregunta: "",
    tieneTiempoMaximo: "S",
    idPregunta: "",
    idExamen: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const dto = {
        porcentajeExamen: Number(formData.porcentajeExamen),
        tiempoPregunta: Number(formData.tiempoPregunta),
        tieneTiempoMaximo: formData.tieneTiempoMaximo,
        idPregunta: Number(formData.idPregunta),
        idExamen: Number(formData.idExamen),
      };

      const respuesta = await agregarPreguntaExamen(dto);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ Error al agregar pregunta: ${err.message || err}`);
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
        Agregar Pregunta al Examen
      </Typography>

      <Box component="form" onSubmit={handleAgregar} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Porcentaje del Examen"
          name="porcentajeExamen"
          type="number"
          value={formData.porcentajeExamen}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Tiempo de la Pregunta (segundos)"
          name="tiempoPregunta"
          type="number"
          value={formData.tiempoPregunta}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="tieneTiempoMaximo-label">¿Tiene Tiempo Máximo?</InputLabel>
          <Select
            labelId="tieneTiempoMaximo-label"
            name="tieneTiempoMaximo"
            value={formData.tieneTiempoMaximo}
            onChange={handleChange}
            label="¿Tiene Tiempo Máximo?"
          >
            <MenuItem value="S">Sí</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="ID de la Pregunta"
          name="idPregunta"
          type="number"
          value={formData.idPregunta}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Examen"
          name="idExamen"
          type="number"
          value={formData.idExamen}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
          Agregar Pregunta
        </Button>

        {mensaje && <Alert severity="success">{mensaje}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Paper>
  );
};

export default AgregarPreguntaExamen;
