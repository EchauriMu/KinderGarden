import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Navbar from "../Components/template/NavBar";
import Dashboard from "../Components/Dashboard/Dashboard";
import AttendanceScreen from "../Components/EntradasSalidas/attendance";
import UserChildManagement from "../Components/Managment/UserManagment";
import InstituteDashboard from "../Components/Institute/Institute";

const Template = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard"); // Estado para el menú seleccionado
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro

  // Función para alternar entre los temas
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <Dashboard />;
      case "attendance":
        return <AttendanceScreen />;
      case "users":
        return <UserChildManagement/>
        case "institute":
        return <InstituteDashboard/>
      case "reports":
        return <div>Contenido de Reportes</div>;
      case "settings":
        return <div>Contenido de Configuración</div>;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    setSelectedMenu("dashboard");
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#1f1f1f" : "#fff", // Cambia el fondo según el tema
      }}
    >
      {/* Navbar recibe el estado y la función para alternar el tema */}
      <Navbar
        onSelectMenuItem={setSelectedMenu}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Layout.Content style={{ padding: "20px" }}>{renderContent()}</Layout.Content>
    </Layout>
  );
};

export default Template;
