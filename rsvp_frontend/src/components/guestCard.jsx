import { useState } from "react";

const opcionesCondicion = [
  "Ninguna",
  "Vegetariano",
  "Vegano",
  "Sin gluten",
  "Alergia frutos secos",
];

export const GuestCard = ({ invitado, onConfirmChange, onMenuChange }) => {
  const [confirmado, setConfirmado] = useState(invitado.confirmado);
  const [tipoMenu, setTipoMenu] = useState(invitado.tipoMenu);
  const [condicion, setCondicion] = useState(invitado.condicionAlimenticia);

  const handleConfirmadoChange = () => {
    const nuevoEstado = !confirmado;
    setConfirmado(nuevoEstado);
    onConfirmChange(invitado._id, nuevoEstado);
  };

  const handleMenuChange = (nuevoMenu) => {
    setTipoMenu(nuevoMenu);
    onMenuChange(invitado._id, nuevoMenu);
  };

  const handleCondicionChange = (e) => {
    setCondicion(e.target.value);
    // Podrías llamar a un onChange del padre si quieres persistir
  };

  return (
    <div className="card shadow-sm rounded-4 border-0 mb-3">
      <div
        className="card-header text-white" 
        style={{ backgroundColor: confirmado ? "#A2BBA3" : "#60222b"
        }}
      >
        {confirmado ? "Confirmado" : "Pendiente de Confirmar"}
      </div>

      <div className="card-body">
        <h6 className="card-title">
          {invitado.nombre} {invitado.apellido}
        </h6>

        {/* Confirmación */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={confirmado}
            onChange={handleConfirmadoChange}
            id={`confirm-${invitado._id}`}
          />
          <label
            className="form-check-label"
            htmlFor={`confirm-${invitado._id}`}
          >
            Confirmar Asistencia
          </label>
        </div>

        {/* Tipo de menú */}
        <div className="mb-3">
          <span className="me-2">Tipo de menú:</span>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={`menu-${invitado._id}`}
              id={`menu-adulto-${invitado._id}`}
              value="Adulto"
              checked={tipoMenu === "Adulto"}
              onChange={() => handleMenuChange("Adulto")}
            />
            <label
              className="form-check-label"
              htmlFor={`menu-adulto-${invitado._id}`}
            >
              Adulto
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={`menu-${invitado._id}`}
              id={`menu-nino-${invitado._id}`}
              value="Niño"
              checked={tipoMenu === "Niño"}
              onChange={() => handleMenuChange("Niño")}
            />
            <label
              className="form-check-label"
              htmlFor={`menu-nino-${invitado._id}`}
            >
              Niño
            </label>
          </div>
        </div>

        {/* Condición alimenticia */}
        <div className="mb-3">
          <label htmlFor={`condicion-${invitado._id}`} className="form-label">
            Condición alimenticia
          </label>

          <select
            id={`condicion-${invitado._id}`}
            className="form-select"
            value={condicion}
            onChange={handleCondicionChange}
          >
            {opcionesCondicion.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
