import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // importa el nuevo componente
import DashboardAlumno from "./components/DashboardAlumno";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* nueva ruta */}
      <Route path="/dashboard-Alumno" element={<DashboardAlumno />} /> {/* nueva ruta */}

    </Routes>
  );
}

export default App;
