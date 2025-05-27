import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { registrarRespuestaTexto } from "../services/ApiServices";

const FormRespuestaTexto = () => {
  const [respuesta, setRespuesta] = useState({
    idPresentacionExamen: "",
    idPregunta: "",
    enunciadoRespuesta: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuesta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const response = await registrarRespuestaTexto(respuesta);
      if (!response.error) {
        setMensaje(`✅ ${response.respuesta}`);
      } else {
        setError(`❌ ${response.mensajeError}`);
      }
    } catch (err) {
      setError("❌ Error al registrar la respuesta.");
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
        Registrar Respuesta de Texto
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID Presentación Examen"
          name="idPresentacionExamen"
          type="number"
          value={respuesta.idPresentacionExamen}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="ID Pregunta"
          name="idPregunta"
          type="number"
          value={respuesta.idPregunta}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Respuesta del Estudiante"
          name="enunciadoRespuesta"
          value={respuesta.enunciadoRespuesta}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar Respuesta
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

export default FormRespuestaTexto;
