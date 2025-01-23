// apiCalls.js

import axiosInstance from "../../../Api/AxiosInstance";
import notificationConfig from "../../../Utils/notifications";

// Función para obtener los grupos
export const fetchGroups = async (setGroups, setFilteredGroups, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.get("/groups/get/groups");
    const data = response.data;

    if (Array.isArray(data)) {
      setGroups(data);
      setFilteredGroups(data);
    } else {
      notificationConfig(
        "error",
        "Error al obtener grupos",
        "La respuesta de la API no es válida."
      );
    }
  } catch (error) {
    notificationConfig(
      "error",
      "Error de conexión",
      error.response?.data?.message || "No se pudo conectar con el servidor."
    );
  } finally {
    setLoading(false);
  }
};

// Función para obtener los tutores
export const fetchTutors = async (setTutors) => {
  try {
    const response = await axiosInstance.get("/tutors/getbyinst");
    setTutors(response.data);
  } catch (error) {
    notificationConfig(
      "error",
      "Error al cargar los tutores",
      "Hubo un problema al cargar la lista de tutores."
    );
  }
};
