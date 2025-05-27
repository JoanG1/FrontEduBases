import React, { useState } from "react";
import { calificarExamen } from "../services/ApiServices";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

const CalificarExamenForm = () => {
  const [formData, setFormData] = useState({
    idPresentacionExamen: "",
    calificacion: "",
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
      const data = {
        idPresentacionExamen: Number(formData.idPresentacionExamen),
        calificacion: Number(formData.calificacion),
      };

      const respuesta = await calificarExamen(data);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ No se pudo calificar el examen: ${err}`);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Formulario de Calificación de Examen
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="ID Presentación Examen"
          type="number"
          name="idPresentacionExamen"
          value={formData.idPresentacionExamen}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Calificación"
          type="number"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ padding: "10px", fontWeight: "bold" }}
        >
          Calificar
        </Button>

        {mensaje && <Alert severity="success">{mensaje}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Paper>
  );
};

export default CalificarExamenForm;
