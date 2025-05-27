import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import { getCursos } from "../services/ApiServices";

const CursosUsuario = () => {
  const [id, setId] = useState("");
  const [rol, setRol] = useState("");
  const [cursos, setCursos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscarCursos = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCursos([]);

    try {
      const response = await getCursos(id, rol);

      if (!response.error) {
        setCursos(response.respuesta || []);
      } else {
        setMensaje(response.mensajeError || "Error al obtener los cursos.");
      }
    } catch (error) {
      setMensaje("❌ Error de conexión al buscar cursos.");
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
        Consultar Cursos
      </Typography>

      <Box
        component="form"
        onSubmit={handleBuscarCursos}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
      >
        <TextField
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar Cursos
        </Button>
      </Box>

      {mensaje && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}

      {cursos.length > 0 ? (
        <List>
          {cursos.map((curso, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={curso.nombre_curso || "Curso sin nombre"}
                secondary={
                  curso.nombre_grupo
                    ? `Grupo: ${curso.nombre_grupo}`
                    : "Sin grupo asignado"
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        !mensaje && (
          <Typography align="center" color="text.secondary">
            No hay cursos para mostrar.
          </Typography>
        )
      )}
    </Paper>
  );
};

export default CursosUsuario;
