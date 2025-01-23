import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import axiosInstance from "../../../Api/AxiosInstance";
import notificationConfig from "../../../Utils/notifications";

const DeleteGroupModal = ({ visible, onCancel, groupIdentifier, fetchGroups }) => {
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationText === groupIdentifier) {
      try {
        await axiosInstance.delete(`/groups/delete/${groupIdentifier}`);
        notificationConfig(
          "success",
          "Grupo eliminado",
          "El grupo ha sido eliminado correctamente."
        );
        onCancel(); // Cierra el modal
        fetchGroups(); // Refresca la lista de grupos
      } catch (error) {
        notificationConfig(
          "error",
          "Error al eliminar el grupo",
          error.response?.data?.message || "Hubo un problema al eliminar el grupo."
        );
      }
    } else {
      notificationConfig(
        "error",
        "Error de confirmación",
        "El texto de confirmación no coincide con el identificador del grupo."
      );
    }
  };

  return (
    <Modal
      title="Confirmación adicional requerida"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          key="delete"
          danger
          type="primary"
          onClick={handleDelete}
          disabled={confirmationText !== groupIdentifier}
        >
          Eliminar
        </Button>,
      ]}
    >
      <p>
        Por seguridad, escribe el identificador del grupo para confirmar la
        eliminación: <strong>{groupIdentifier}</strong>
      </p>
      <Input
        placeholder="Escribe el identificador del grupo"
        value={confirmationText}
        onChange={(e) => setConfirmationText(e.target.value)}
        style={{ marginTop: "10px" }}
      />
    </Modal>
  );
};

export default DeleteGroupModal;
