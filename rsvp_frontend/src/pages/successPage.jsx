import { useGuestStore } from "../hook/useGuestStore";

export const SuccessPage = () => {
  const { initlogout, errorMessage } = useGuestStore();

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-sm rounded-4 border-2 p-5">
        <h2 className="text-success mb-3">¡Confirmación guardada con éxito!</h2>
        <p>Gracias por confirmar tu asistencia. ¡Nos vemos en nuestra boda 🎉!</p>
        <div className="mt-3 text-center">
          <button
            className="btn btn-lg w-auto px-4"
            style={{
              backgroundColor: "#2d405c",
              color: "#ffffff",
              border: "none",
            }}
            onClick={initlogout}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
