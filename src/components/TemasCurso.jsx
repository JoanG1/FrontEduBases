import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getTemasCurso } from "../services/ApiServices";

const TemasCurso = () => {
  const [idCurso, setIdCurso] = useState("");
  const [temas, setTemas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscarTemas = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTemas([]);

    try {
      const response = await getTemasCurso(parseInt(idCurso));

      if (!response.error) {
        setTemas(response.respuesta || []);
      } else {
        setMensaje(`❌ ${response.mensajeError || "Error al obtener los temas."}`);
      }
    } catch (err) {
      setMensaje("❌ Error inesperado al consultar los temas.");
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
      <Typography variant="h5" align="center" gutterBottom>
        Temas del Curso
      </Typography>

      <Box
        component="form"
        onSubmit={handleBuscarTemas}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID del Curso"
          type="number"
          value={idCurso}
          onChange={(e) => setIdCurso(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Buscar Temas
        </Button>
      </Box>

      {mensaje && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      )}

      {temas.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Lista de Temas
          </Typography>
          <List>
            {temas.map((tema, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={tema.titulo || "Tema sin título"}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {temas.length === 0 && !mensaje && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No hay temas para mostrar.
        </Typography>
      )}
    </Paper>
  );
};

export default TemasCurso;
