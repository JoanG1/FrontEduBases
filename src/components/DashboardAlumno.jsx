// src/components/DashboardAlumno.jsx
import React from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  Divider
} from "@mui/material";
import FormPregunta from "./FormPregunta";
import NotaPresentacion from "./NotaPresentacion";
import FormPresentacionExamen from "./FormPresentacionExamen";
import ExamenesPendientesAlumno from "./ExamenesPendientesAlumno";
import ExamenesHechosAlumno from "./ExamenesHechosAlumno";
import CursosAlumno from "./CursosAlumno";

// Componente reutilizable de sección
const Section = ({ title, children }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Paper>
);

const DashboardAlumno = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
          Bienvenido al Panel Alumno
        </Typography>

        <Section title="Guardar Pregunta">
          <FormPregunta />
        </Section>

        <Section title="Obtener Nota de Presentación">
          <NotaPresentacion />
        </Section>

        <Section title="Obtener Cursos">
          <CursosAlumno />
        </Section>

        <Section title="Presentación de Examen">
          <FormPresentacionExamen />
        </Section>

        <Section title="Exámenes Pendientes">
          <ExamenesPendientesAlumno />
        </Section>

        <Section title="Exámenes Realizados">
          <ExamenesHechosAlumno />
        </Section>
      </Box>
    </Container>
  );
};

export default DashboardAlumno;
