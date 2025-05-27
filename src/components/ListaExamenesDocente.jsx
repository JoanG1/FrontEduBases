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
  Divider,
} from "@mui/material";
import { obtenerExamenesDocente } from "../services/ApiServices";

const ListaExamenesDocente = () => {
  const [idDocente, setIdDocente] = useState("");
  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState("");

  const cargarExamenes = async () => {
    if (!idDocente.trim()) {
      setError("Por favor ingresa un ID de docente.");
      setExamenes([]);
      return;
    }

    try {
      const resultado = await obtenerExamenesDocente(idDocente);
      setExamenes(resultado || []);
      setError("");
    } catch (err) {
      setError("❌ " + err.toString());
      setExamenes([]);
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
        Exámenes del Docente
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <TextField
          label="ID del Docente"
          value={idDocente}
          onChange={(e) => setIdDocente(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={cargarExamenes} fullWidth>
          Cargar Exámenes
        </Button>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!error && examenes.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            No hay exámenes disponibles.
          </Typography>
        )}

        {examenes.length > 0 && (
          <List>
            {examenes.map((examen) => (
              <React.Fragment key={examen.id_examen}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<strong>{examen.nombre}</strong>}
                    secondary={
                      <>
                        Inicio: {examen.fecha_hora_inicio} <br />
                        Estado: {examen.estado}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default ListaExamenesDocente;
