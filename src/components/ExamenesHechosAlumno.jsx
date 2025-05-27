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
import { obtenerExamenesHechos } from "../services/ApiServices";

const ExamenesHechosAlumno = () => {
  const [formData, setFormData] = useState({
    matriculaAlumno: "",
    idCurso: "",
  });

  const [examenes, setExamenes] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cargarExamenes = async (event) => {
    event.preventDefault();
    setError("");
    setExamenes([]);

    try {
      const data = await obtenerExamenesHechos(
        formData.matriculaAlumno,
        Number(formData.idCurso)
      );
      setExamenes(data || []);
    } catch (err) {
      setError("❌ Error al obtener exámenes: " + err.toString());
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
        Ver Exámenes Hechos por Alumno
      </Typography>

      <Box
        component="form"
        onSubmit={cargarExamenes}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID del Alumno"
          name="matriculaAlumno"
          value={formData.matriculaAlumno}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Curso"
          name="idCurso"
          type="number"
          value={formData.idCurso}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Buscar Exámenes
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {Array.isArray(examenes) && examenes.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Resultados:
          </Typography>
          <List>
            {examenes.map((examen, i) => (
              <React.Fragment key={i}>
                <ListItem>
                  <ListItemText
                    primary={examen.nombreExamen}
                    secondary={`Calificación: ${examen.calificacion}`}
                  />
                </ListItem>
                {i < examenes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default ExamenesHechosAlumno;
