import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { GuestCard } from "../components/guestCard";
import { useGuestStore } from "../hook/useGuestStore";
import logo from "../assets/logo.png";
import "./guestsPageStyle.css";

export const GuestsPage = () => {
  const { guest, status, errorMessage } = useGuestStore();
  const [invitados, setInvitados] = useState([]);

  useEffect(() => {
    if (guest) {
      const todos = [
        { ...guest, tipoInvitado: "principal" },
        ...guest.acompanantes,
      ];
      setInvitados(todos);
    }
  }, [guest]);

  useEffect(() => {
    if (errorMessage) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  const handleConfirmChange = (id, confirmado) => {
    setInvitados((prev) =>
      prev.map((inv) => (inv._id === id ? { ...inv, confirmado } : inv))
    );
  };

  const handleMenuChange = (id, tipoMenu) => {
    setInvitados((prev) =>
      prev.map((inv) => (inv._id === id ? { ...inv, tipoMenu } : inv))
    );
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar la información en el backend
    Swal.fire(
      "Guardado",
      "La información de los invitados se ha guardado.",
      "success"
    );
  };

  return (
    <div className="container mt-5 guest-page-container">
      {/* Card de instrucciones */}
      <div className="card mb-4 shadow-sm rounded-4 border-2">
        <div
          className="card-header"
          style={{ backgroundColor: "#2d405c", color: "white" }}
        >
          Formulario de confirmación de asistencia
        </div>

        <div
          className="card-body d-flex align-items-center"
          style={{ backgroundColor: "#f1efe8", color: "black" }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "150px", marginRight: "15px" }}
          />
          <p className="mb-0">
            Por favor confirme su asistencia y seleccione el tipo de menú
            correspondiente para usted y sus acompañantes.
          </p>
        </div>
      </div>

      {/* Contenedor de GuestCards */}
      <div className="card shadow-sm rounded-4 border-2">
        <div
          className="card-header"
          style={{ backgroundColor: "#2d405c", color: "white" }}
        >
          Lista Invitados
        </div>

        <div
          className="card-body "
          style={{ backgroundColor: "#f1efe8", color: "black" }}
        >
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4 guest-cards-container">
            {invitados.map((inv) => (
              <div key={inv._id} className="guest-card-wrapper">
                <GuestCard
                  invitado={inv}
                  onConfirmChange={handleConfirmChange}
                  onMenuChange={handleMenuChange}
                />
              </div>
            ))}
          </div>

          {/* Botón de guardar */}
          <div className="d-flex justify-content-center mb-4">
            <button
              className="btn btn-lg"
              style={{
                backgroundColor: "#2d405c", // color personalizado
                color: "#ffffff", // color del texto
                border: "none", // opcional: quitar borde
              }}
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
