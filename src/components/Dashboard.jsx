// src/components/Dashboard.jsx
import React from "react";
import { Typography, Box, Container } from "@mui/material";
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

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenido al Panel Profesor
        </Typography>
        <h1>Formulario respuesta</h1>
        <FormularioRespuesta/>
        <h1>Formulario Examen</h1>
        <FormularioExamen/>
        <h1>Formulario Pregunta</h1>
        <FormularioPregunta/>
        <h1>Agregar Pregunta Examen</h1>
        <AgregarPreguntaExamen/>
        <h1>Calificar examen</h1>
        <CalificarExamenForm/>
        <h1>Listar preguntas docente</h1>
        <ListaPreguntasDocente/>
        <h1>Examenes del docente</h1>
        <ListaExamenesDocente/>
        <h1>Conseguir nombre</h1>
        <NombreUsuario/>
        <h1>Conseguir Cursos</h1>
        <CursosUsuario/>
        <h1>Temas Cursos</h1>
        <TemasCurso/>
        <h1>Temas Docentes</h1>
        <TemasDocente/>

      </Box>
    </Container>
  );
};

export default Dashboard;
