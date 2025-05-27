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
} from "@mui/material";
import { presentarExamen } from "../services/ApiServices";

const FormPresentacionExamen = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPresentacion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    setPreguntas([]);

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
        Presentar Examen
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
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
          <Typography variant="h6">Preguntas del examen:</Typography>
          <List>
            {preguntas.map((pregunta) => (
              <Box key={pregunta.idPregunta}>
                <ListItem>
                  <ListItemText
                    primary={`(${pregunta.tipoPregunta}) ${pregunta.enunciado}`}
                  />
                </ListItem>
                {pregunta.respuestas && pregunta.respuestas.length > 0 && (
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {pregunta.respuestas.map((r) => (
                      <ListItem key={r.idRespuesta}>
                        <ListItemText primary={`• ${r.descripcion}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default FormPresentacionExamen;
