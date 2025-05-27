// src/components/Dashboard.jsx
import React from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  Divider
} from "@mui/material";
import FormularioRespuesta from "./FormularioRespuesta";
import FormularioExamen from "./FormularioExamen";
import FormularioPregunta from "./FormularioPregunta";
import CalificarExamenForm from "./CalificarExamenForm";
import ListaPreguntasDocente from "./ListaPreguntasDocente";
import ListaExamenesDocente from "./ListaExamenesDocente";
import NombreUsuario from "./NombreUsuario";
import CursosUsuario from "./CursosUsuario";
import TemasCurso from "./TemasCurso";
import TemasDocente from "./TemasDocente";
import AgregarPreguntaExamen from "./AgregarPreguntaExamen";

const Section = ({ title, children }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Paper>
);

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
          Bienvenido al Panel Profesor
        </Typography>

        <Section title="Formulario Respuesta">
          <FormularioRespuesta />
        </Section>

        <Section title="Formulario Examen">
          <FormularioExamen />
        </Section>

        <Section title="Formulario Pregunta">
          <FormularioPregunta />
        </Section>

        <Section title="Agregar Pregunta al Examen">
          <AgregarPreguntaExamen />
        </Section>

        <Section title="Calificar Examen">
          <CalificarExamenForm />
        </Section>

        <Section title="Listar Preguntas del Docente">
          <ListaPreguntasDocente />
        </Section>

        <Section title="Exámenes del Docente">
          <ListaExamenesDocente />
        </Section>

        <Section title="Buscar Nombre del Docente">
          <NombreUsuario />
        </Section>

        <Section title="Conseguir Cursos">
          <CursosUsuario />
        </Section>

        <Section title="Temas del Curso">
          <TemasCurso />
        </Section>

        <Section title="Temas del Docente">
          <TemasDocente />
        </Section>
      </Box>
    </Container>
  );
};

export default Dashboard;
