import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { presentarExamen, registrarRespuestaTexto } from "../services/ApiServices";

const FormularioExamenCompleto = () => {
  const [presentacion, setPresentacion] = useState({
    tiempo: "",
    terminado: "0",
    ipSource: "",
    fechaHoraPresentacion: "",
    idExamen: "",
    idAlumno: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestasEstudiante, setRespuestasEstudiante] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPresentacion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRespuestaChange = (idPregunta, valor) => {
    setRespuestasEstudiante((prev) => ({
      ...prev,
      [idPregunta]: valor,
    }));
  };

  const handleMultipleChange = (idPregunta, opcion) => {
    const actuales = respuestasEstudiante[idPregunta] || [];
    const existe = actuales.includes(opcion);
    setRespuestasEstudiante((prev) => ({
      ...prev,
      [idPregunta]: existe
        ? actuales.filter((item) => item !== opcion)
        : [...actuales, opcion],
    }));
  };

  const handleSubmitPresentacion = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    setPreguntas([]);
    setRespuestasEstudiante({});

    const presentacionDTO = {
      ...presentacion,
      tiempo: parseInt(presentacion.tiempo),
      terminado: presentacion.terminado === "1" ? "1" : "0",
      idExamen: parseInt(presentacion.idExamen),
      idAlumno: parseInt(presentacion.idAlumno),
      fechaHoraPresentacion: new Date(presentacion.fechaHoraPresentacion),
    };

    try {
      const response = await presentarExamen(presentacionDTO);
      if (!response.error) {
        setMensaje(`✅ ${response.mensajeError}`);
        setPreguntas(response.respuesta || []);
      } else {
        setError(`❌ ${response.mensajeError}`);
      }
    } catch (err) {
      setError(`❌ Error inesperado al presentar el examen`);
    }
  };

  const handleSubmitRespuestas = async () => {
    setMensaje(null);
    setError(null);
    try {
      for (let pregunta of preguntas) {
        const idPregunta = pregunta.idPregunta;
        const respuesta = respuestasEstudiante[idPregunta];

        if (!respuesta || respuesta.length === 0) continue;

        const enunciadoRespuesta = Array.isArray(respuesta)
          ? respuesta.join(", ")
          : respuesta;

        const respuestaData = {
          idPresentacionExamen: pregunta.idPresentacionExamen,
          idPregunta,
          enunciadoRespuesta,
        };

        await registrarRespuestaTexto(respuestaData);
      }

      setMensaje("✅ Respuestas registradas correctamente");
    } catch (err) {
      setError("❌ Error al registrar las respuestas");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        margin: "2rem auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Presentar Examen
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmitPresentacion}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Tiempo (minutos)"
          name="tiempo"
          type="number"
          value={presentacion.tiempo}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="terminado-label">Estado</InputLabel>
          <Select
            labelId="terminado-label"
            name="terminado"
            value={presentacion.terminado}
            onChange={handleChange}
            label="Estado"
          >
            <MenuItem value="0">No terminado</MenuItem>
            <MenuItem value="1">Terminado</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="IP del dispositivo"
          name="ipSource"
          value={presentacion.ipSource}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Fecha y Hora"
          name="fechaHoraPresentacion"
          type="datetime-local"
          value={presentacion.fechaHoraPresentacion}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />

        <TextField
          label="ID del Examen"
          name="idExamen"
          type="number"
          value={presentacion.idExamen}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="ID del Alumno"
          name="idAlumno"
          type="number"
          value={presentacion.idAlumno}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar Presentación
        </Button>
      </Box>

      {mensaje && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {preguntas.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Responde las preguntas:</Typography>
          <List>
            {preguntas.map((pregunta) => (
              <Box key={pregunta.idPregunta} mb={2}>
                <ListItem>
                  <ListItemText
                    primary={`(${pregunta.idPregunta}) ${pregunta.enunciado}`}
                  />
                </ListItem>

                {/* ✅ RESPUESTA_UNICA o SELECCION_UNICA */}
                {["RESPUESTA_UNICA", "SELECCION_UNICA"].includes(
                  pregunta.tipoPregunta
                ) && (
                  <TextField
                    fullWidth
                    label="Tu respuesta"
                    value={respuestasEstudiante[pregunta.idPregunta] || ""}
                    onChange={(e) =>
                      handleRespuestaChange(
                        pregunta.idPregunta,
                        e.target.value
                      )
                    }
                  />
                )}

                {/* Tipo falso_verdadero */}
                {pregunta.tipoPregunta === "falso_verdadero" && (
                  <RadioGroup
                    value={respuestasEstudiante[pregunta.idPregunta] || ""}
                    onChange={(e) =>
                      handleRespuestaChange(
                        pregunta.idPregunta,
                        e.target.value
                      )
                    }
                  >
                    {pregunta.respuestas.map((r) => (
                      <FormControlLabel
                        key={r.idRespuesta}
                        value={r.descripcion}
                        control={<Radio />}
                        label={r.descripcion}
                      />
                    ))}
                  </RadioGroup>
                )}

                {/* Tipo multiple_multiple_respuesta */}
                {pregunta.tipoPregunta === "multiple_multiple_respuesta" && (
                  <Box>
                    {pregunta.respuestas.map((r) => (
                      <FormControlLabel
                        key={r.idRespuesta}
                        control={
                          <Checkbox
                            checked={
                              respuestasEstudiante[
                                pregunta.idPregunta
                              ]?.includes(r.descripcion) || false
                            }
                            onChange={() =>
                              handleMultipleChange(
                                pregunta.idPregunta,
                                r.descripcion
                              )
                            }
                          />
                        }
                        label={r.descripcion}
                      />
                    ))}
                  </Box>
                )}
                <Divider />
              </Box>
            ))}
          </List>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitRespuestas}
            fullWidth
            sx={{ mt: 3 }}
          >
            Enviar Respuestas
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default FormularioExamenCompleto;
