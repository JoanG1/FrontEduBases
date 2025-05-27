import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { getNombre } from "../services/ApiServices";

const NombreUsuario = () => {
  const [id, setId] = useState("");
  const [rol] = useState("docente"); // Valor fijo
  const [nombre, setNombre] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleBuscarNombre = async (e) => {
    e.preventDefault();
    try {
      const response = await getNombre(id, rol);
      if (!response.error) {
        setNombre(response.respuesta || "Nombre no disponible");
        setMensaje("");
      } else {
        setNombre(null);
        setMensaje(response.mensajeError || "Error al buscar el nombre");
      }
    } catch (err) {
      setNombre(null);
      setMensaje("❌ Error en la solicitud");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Buscar Nombre de Docente
      </Typography>

      <Box
        component="form"
        onSubmit={handleBuscarNombre}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID del Docente"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Buscar
        </Button>
      </Box>

      {mensaje && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      )}

      {nombre && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <strong>Nombre:</strong> {nombre}
        </Alert>
      )}
    </Paper>
  );
};

export default NombreUsuario;
