import React from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import FormPregunta from "./FormPregunta";
import NotaPresentacion from "./NotaPresentacion";
import FormPresentacionExamen from "./FormPresentacionExamen";
import ExamenesPendientesAlumno from "./ExamenesPendientesAlumno";
import ExamenesHechosAlumno from "./ExamenesHechosAlumno";
import CursosAlumno from "./CursosAlumno";
import FormRespuestaTexto from "./FormRespuestaTexto"; // ✅ NUEVO IMPORT
import FormularioExamenCompleto from "./FormularioExamenCompleto";

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
    <Box
      sx={{
        backgroundColor: "#1565c0", // azul oscuro
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 4, textAlign: "center", color: "white" }}
          >
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

          <Section title="Exámenes Pendientes">
            <ExamenesPendientesAlumno />
          </Section>

          <Section title="Exámenes Realizados">
            <ExamenesHechosAlumno />
          </Section>

           <Section title="Exámenes completo">
            <FormularioExamenCompleto />
          </Section>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardAlumno;

