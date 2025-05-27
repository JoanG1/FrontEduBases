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
import { useNavigate } from "react-router-dom";
import { login } from "../services/ApiServices";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [rol, setRol] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginDTO = { id, rol };
      const response = await login(loginDTO);

      if (response.error === false && response.respuesta === true) {
        setMensaje(response.mensajeError || "Acceso concedido ✔️");

        if (rol === "alumno") {
          navigate("/dashboard-Alumno");
        } else {
          navigate("/dashboard");
        }
      } else {
        setMensaje("❌ Acceso denegado");
      }
    } catch (error) {
      setMensaje("❌ Error en la conexión");
      console.error("Error al iniciar sesión:", error);
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
      <Typography variant="h5" gutterBottom align="center">
        Iniciar Sesión
      </Typography>

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID de Usuario"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="rol-label">Rol</InputLabel>
          <Select
            labelId="rol-label"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            label="Rol"
          >
            <MenuItem value="docente">Docente</MenuItem>
            <MenuItem value="alumno">Alumno</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>

      {mensaje && (
        <Alert
          severity={
            mensaje.includes("❌") ? "error" : "success"
          }
          sx={{ mt: 2 }}
        >
          {mensaje}
        </Alert>
      )}
    </Paper>
  );
};

export default LoginForm;
