// src/components/Dashboard.jsx
import React from "react";
import { Typography, Box, Container } from "@mui/material";
import FormPregunta from "./FormPregunta";
import NotaPresentacion from "./NotaPresentacion";
import FormPresentacionExamen from "./FormPresentacionExamen";
import ExamenesPendientesAlumno from "./ExamenesPendientesAlumno";
import ExamenesHechosAlumno from "./ExamenesHechosAlumno";
import CursosAlumno from "./CursosAlumno";


const DashboardAlumno = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenido al Panel Alumno
        </Typography>
        <h1>Guardar pregunta</h1>
        <FormPregunta/>
        <h1>Obtener Nota</h1>
        <NotaPresentacion/>
        <h1>Obtener Cursos</h1>
        <CursosAlumno/>
        <h1>Presentacion Examen</h1>
        <FormPresentacionExamen/>
        <h1>Examen Pendientes</h1>
        <ExamenesPendientesAlumno/>
        <h1>Examen Hechos</h1>
        <ExamenesHechosAlumno/>

      </Box>
    </Container>
  );
};

export default DashboardAlumno;