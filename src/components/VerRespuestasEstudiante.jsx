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
import { verRespuestasEstudiante } from "../services/ApiServices";

const VerRespuestasEstudiante = () => {
  const [formData, setFormData] = useState({
    idExamen: "",
    idAlumno: "",
  });

  const [respuestas, setRespuestas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    setRespuestas([]);

    try {
      const response = await verRespuestasEstudiante(formData.idExamen, formData.idAlumno);
      if (!response.error) {
        setRespuestas(response.respuesta);
        setMensaje("✅ Respuestas cargadas correctamente.");
      } else {
        setError(`❌ ${response.mensajeError}`);
      }
    } catch {
      setError("❌ Error al obtener respuestas del estudiante.");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: "2rem auto", padding: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        Ver Respuestas del Estudiante
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID Examen"
          name="idExamen"
          type="number"
          value={formData.idExamen}
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
          Ver Respuestas
        </Button>
      </Box>

      {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {respuestas.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Resultados:
          </Typography>
          <List>
            {respuestas.map((item) => (
              <Box key={`${item.idPregunta}-${item.idPresentacionExamen}`}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`(${item.idPregunta}) ${item.enunciadoPregunta}`}
                    secondary={`Respuesta: ${item.respuestaEstudiante}`}
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default VerRespuestasEstudiante;
