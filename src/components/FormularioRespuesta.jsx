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
import { crearRespuesta } from "../services/ApiServices";

const FormularioRespuesta = () => {
  const [descripcion, setDescripcion] = useState("");
  const [esVerdadera, setEsVerdadera] = useState("S");
  const [idPregunta, setIdPregunta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const data = {
        descripcion,
        esVerdadera,
        id_pregunta: Number(idPregunta),
      };

      const respuesta = await crearRespuesta(data);
      setMensaje(`✅ ${respuesta}`);
    } catch (err) {
      setError(`❌ Hubo un error al crear la respuesta: ${err}`);
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
        Crear Respuesta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="verdadera-label">¿Es Verdadera?</InputLabel>
          <Select
            labelId="verdadera-label"
            value={esVerdadera}
            onChange={(e) => setEsVerdadera(e.target.value)}
            label="¿Es Verdadera?"
          >
            <MenuItem value="S">Sí</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="ID Pregunta"
          type="number"
          value={idPregunta}
          onChange={(e) => setIdPregunta(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar
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

export default FormularioRespuesta;
