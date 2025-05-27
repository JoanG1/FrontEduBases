import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { obtenerNota } from "../services/ApiServices";

const NotaPresentacion = () => {
  const [formData, setFormData] = useState({
    idPresentacion: "",
    idAlumno: "",
  });

  const [nota, setNota] = useState(null);
  const [error, setError] = useState("");

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
    setError("");

    try {
      const payload = {
        idPresentacion: parseInt(formData.idPresentacion),
        idAlumno: parseInt(formData.idAlumno),
      };

      const response = await obtenerNota(payload);

      if (!response.error) {
        setNota(response.respuesta ?? 0.0);
      } else {
        setError(`❌ ${response.mensajeError || "No se pudo obtener la nota"}`);
      }
    } catch (err) {
      setError("❌ Error inesperado al consultar la nota");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Consultar Nota de Presentación
      </Typography>

      <Box
        component="form"
        onSubmit={handleConsultarNota}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID Presentación Examen"
          name="idPresentacion"
          type="number"
          value={formData.idPresentacion}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID Alumno"
          name="idAlumno"
          type="number"
          value={formData.idAlumno}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Consultar
        </Button>
      </Box>

      {nota !== null && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <strong>Nota:</strong> {nota}
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

export default NotaPresentacion;
