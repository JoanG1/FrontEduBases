import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getAllTemas } from "../services/ApiServices";

const TemasDocente = () => {
  const [temas, setTemas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleCargarTemas = async () => {
    setMensaje("");
    setTemas([]);

    try {
      const response = await getAllTemas();

      if (!response.error) {
        setTemas(response.respuesta || []);
      } else {
        setMensaje(`❌ ${response.mensajeError || "Error al cargar los temas."}`);
      }
    } catch (err) {
      setMensaje("❌ Error inesperado al cargar los temas.");
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
        Todos los Temas de los Docentes
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCargarTemas}>
          Cargar Temas
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
            {temas.map((tema) => (
              <ListItem key={tema.id_tema}>
                <ListItemText
                  primary={tema.titulo || "Sin título"}
                  secondary={`ID: ${tema.id_tema}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {temas.length === 0 && !mensaje && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No hay temas cargados.
        </Typography>
      )}
    </Paper>
  );
};

export default TemasDocente;
