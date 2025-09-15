import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GuestCard } from "../components/guestCard";
import { useGuestStore } from "../hook/useGuestStore";
import logo from "../assets/logo.png";
import "./guestsPageStyle.css";

export const GuestsPage = () => {
  const { guest, status, errorMessage, updateGuest } = useGuestStore();
  const [invitados, setInvitados] = useState([]);
  const navigate = useNavigate();

//----------------------------------------------------------------------  

  useEffect(() => {
    if (guest) {
      const todos = [{ ...guest, tipoInvitado: "principal" }, ...(guest.acompanantes || [] )];
      setInvitados(todos);
    }
  }, [guest]);

  useEffect(() => {
    if (errorMessage) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  //---------------------------------------------------------------------
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

  const handleCondicionChange = (id, condicionAlimenticia) => {
  setInvitados(prev =>
    prev.map(inv => (inv._id === id ? { ...inv, condicionAlimenticia } : inv))
    );
  };

  //---------------------------------------------------------------------

  const handleSave = async () => {
    const principal = invitados.find((i) => i.tipoInvitado === "principal") || invitados[0];
    const acompanantes = invitados.filter((i) => i._id !== principal._id)
      .map((a) => ({
        _id: a._id,
        confirmado: a.confirmado,
        tipoMenu: a.tipoMenu,
        condicionAlimenticia: a.condicionAlimenticia,
      }));

    const invitadoPayload = {
      confirmado: principal.confirmado,
      tipoMenu: principal.tipoMenu,
      condicionAlimenticia: principal.condicionAlimenticia,
    };

    await updateGuest({
      id: principal._id,
      invitado: invitadoPayload,
      acompanantes,
    });

    navigate("/success");
  };

  return (
    <div className="container mt-5 guest-page-container">
      {/*----------------------Card de instrucciones-----------------------*/}
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

      {/*---------------------Contenedor de GuestCards-------------------------*/}
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
                  onCondicionChange={handleCondicionChange}
                />
              </div>
            ))}
          </div>

          {/*----------------------------Botón de guardar--------------------------*/}
          <div className="d-flex justify-content-center mb-4">
            <button
              className="btn btn-lg"
              style={{
                backgroundColor: "#2d405c",
                color: "#ffffff", 
                border: "none", 
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
