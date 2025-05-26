// src/services/ApiServices.js
import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:8080"; // Usa esta en producción, y localhost en desarrollo si es necesario


// Instancia de Axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const crearRespuesta = async (data) => {
  try {
    const response = await api.post("/api/docente/crearRespuesta", data);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al crear respuesta:", error);
    throw error.response?.data?.mensaje || "Error al crear la respuesta";
  }
};

export const crearExamen = async (examen) => {
  try {
    const response = await api.post("/api/docente/crearExamen", examen);
    return response.data.respuesta; // Ajusta según cómo devuelva el backend
  } catch (error) {
    console.error("Error al crear el examen:", error);
    throw error.response?.data?.mensaje || "Error al crear el examen";
  }
};

export const crearPregunta = async (pregunta) => {
  try {
    const response = await api.post("/api/docente/crearPregunta", pregunta);
    return response.data.respuesta; // El backend devuelve el mensaje aquí
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    throw error.response?.data?.mensaje || "Error al crear la pregunta";
  }
};

export const agregarPreguntaExamen = async (preguntaExamenDto) => {
  try {
    const response = await api.post("/api/docente/agregar-pregunta-examen", preguntaExamenDto);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al agregar pregunta al examen:", error);
    throw error.response?.data?.mensaje || "Error al agregar pregunta al examen";
  }
};

export const calificarExamen = async (datos) => {
  try {
    const response = await api.post("/api/docente/calificarExamen", datos);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al calificar el examen:", error);
    throw error.response?.data?.mensaje || "Error al calificar el examen";
  }
};

export const obtenerPreguntasDocente = async (idDocente) => {
  try {
    const response = await api.post("/api/docente/obtenerPreguntasDocente", idDocente);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al obtener las preguntas del docente:", error);
    throw error.response?.data?.mensaje || "Error al obtener las preguntas";
  }
};

export const obtenerExamenesDocente = async (idDocente) => {
  try {
    const response = await api.post("/api/docente/obtenerExamenesDocente", idDocente);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al obtener exámenes del docente:", error);
    throw error.response?.data?.mensaje || "Error al obtener los exámenes";
  }
};

// Servicio: Login
export const login = async (loginData) => {
  try {
    const response = await api.post("/api/auth/login", loginData);
    return response.data; // Se espera: MensajeDTO<Boolean>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: false };
    }
  }
};

export const getNombre = async (id, rol) => {
  try {
    const response = await api.get(`/api/docente/nombre/${id}/${rol}`);
    return response.data; // Se espera: MensajeDTO<String>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: null };
    }
  }
};

export const getCursos = async (id, rol) => {
  try {
    const response = await api.get(`/api/docente/cursos/${id}/${rol}`);
    return response.data; // Se espera: MensajeDTO<List<CursoDTO>>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: [] };
    }
  }
};

export const getTemasCurso = async (idCurso) => {
  try {
    const response = await api.get(`/api/docente/temasCurso/${idCurso}`);
    return response.data; // Se espera: MensajeDTO<List<TemasCursoDTO>>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: [] };
    }
  }
};

export const getAllTemas = async () => {
  try {
    const response = await api.get('/api/docente/allTemas');
    return response.data; // Se espera: MensajeDTO<List<TemasCursoDTO>>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: [] };
    }
  }
};


//ESTUDIANTE


export const guardarPregunta = async (preguntaData) => {
  try {
    const response = await api.post('/api/estudiante/guardar-pregunta', preguntaData);
    return response.data; // Se espera: MensajeDTO<String>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: null };
    }
  }
};

export const obtenerNota = async (data) => {
  try {
    const response = await api.post('/api/estudiante/obtener-nota', data);
    return response.data; // Se espera: MensajeDTO<Float>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: 0.0 };
    }
  }
};

export const presentarExamen = async (presentacionData) => {
  try {
    const response = await api.post('/api/estudiante/presentar-examen', presentacionData);
    return response.data; // Se espera: MensajeDTO<String>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: null };
    }
  }
};

export const obtenerExamenesPendientes = async (idAlumno, idGrupo) => {
  try {
    const response = await api.get(`/api/estudiante/examenes-pendientes/${idAlumno}/${idGrupo}`);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al obtener exámenes pendientes:", error);
    throw error.response?.data?.mensaje || "Error al obtener exámenes pendientes";
  }
};

export const obtenerExamenesHechos = async (idAlumno, idGrupo) => {
  try {
    const response = await api.get(`/api/estudiante/examenes-hechos/${idAlumno}/${idGrupo}`);
    return response.data.respuesta;
  } catch (error) {
    console.error("Error al obtener exámenes hechos:", error);
    throw error.response?.data?.mensaje || "Error al obtener exámenes hechos";
  }
};

export const getCursosAlumno = async (id, rol) => {
  try {
    const response = await api.get(`/api/estudiante/cursos/${id}/${rol}`);
    return response.data; // Se espera: MensajeDTO<List<CursoDTO>>
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: true, mensaje: "Error de red", data: [] };
    }
  }
};

