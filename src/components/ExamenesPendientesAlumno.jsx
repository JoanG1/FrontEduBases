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
import { obtenerExamenesPendientes } from "../services/ApiServices";

const ExamenesPendientesAlumno = () => {
  const [formData, setFormData] = useState({
    matriculaAlumno: "",
    idCurso: "",
  });

  const [pendientes, setPendientes] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cargarPendientes = async (e) => {
    e.preventDefault();
    setError("");
    setPendientes([]);

    try {
      const data = await obtenerExamenesPendientes(
        formData.matriculaAlumno,
        Number(formData.idCurso)
      );
      setPendientes(data || []);
    } catch (err) {
      setError("❌ Error al obtener exámenes pendientes: " + err.toString());
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
        Exámenes Pendientes del Alumno
      </Typography>

      <Box
        component="form"
        onSubmit={cargarPendientes}
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
          Buscar Pendientes
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {Array.isArray(pendientes) && pendientes.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Lista de Exámenes Pendientes:
          </Typography>
          <List>
            {pendientes.map((examen) => (
              <React.Fragment key={examen.id_examen}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<strong>{examen.nombre}</strong>}
                    secondary={
                      <>
                        Tema: {examen.tema} <br />
                        Inicio: {examen.fecha_hora_inicio} <br />
                        Tiempo máximo: {examen.tiempo_max} minutos
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default ExamenesPendientesAlumno;
