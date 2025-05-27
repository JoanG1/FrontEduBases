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
import { obtenerPreguntasDocente } from "../services/ApiServices";

const ListaPreguntasDocente = () => {
  const [idDocente, setIdDocente] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState("");

  const cargarPreguntas = async () => {
    if (!idDocente.trim()) {
      setError("Por favor ingresa un ID de docente.");
      setPreguntas([]);
      return;
    }

    try {
      const resultado = await obtenerPreguntasDocente(idDocente);
      setPreguntas(resultado || []);
      setError("");
    } catch (err) {
      setError("❌ " + err.toString());
      setPreguntas([]);
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
        Preguntas del Docente
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

        <Button variant="contained" onClick={cargarPreguntas} fullWidth>
          Cargar Preguntas
        </Button>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!error && preguntas.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            No hay preguntas disponibles.
          </Typography>
        )}

        {preguntas.length > 0 && (
          <List>
            {preguntas.map((p) => (
              <React.Fragment key={p.id_pregunta}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<strong>{p.enunciado}</strong>}
                    secondary={
                      <>
                        Tipo: {p.tipo_pregunta} <br />
                        Pública: {p.es_publica === "S" ? "Sí" : "No"}
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

export default ListaPreguntasDocente;
