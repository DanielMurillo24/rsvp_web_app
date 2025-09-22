import rsvpApi from "../api/rsvpApi";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout, onError, onUpdateGuest } from "../store";

export const useGuestStore = () => {
  const { status, invitado, errorMessage } = useSelector((state) => state.guest);
  const dispatch = useDispatch();

//--------------------------------------------------------------------------

  const login = async ({ codigoAcceso }) => {
    dispatch(onChecking());

    try {
      const { data } = await rsvpApi.post("/auth", { codigoAcceso });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ invitado: data.invitado }));
    } catch (error) {
      if (error.response) {
        // Si el backend responde con 401, es un error de autenticación real
        if (error.response.status === 400) {
          dispatch(onLogout("Código Incorrecto"));
        } else {
          dispatch(onLogout("Error del Servidor. Intente más tarde."));
        }
      } else if (error.request) {
        // No se recibió respuesta del servidor
        dispatch(onLogout("El servidor no responde."));
      } else {
        // Otro tipo de error
        console.log("Error", error.message);
        dispatch(onLogout("Un error inexperado ocurrió."));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

//--------------------------------------------------------------------------
    const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await rsvpApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ invitado: data.invitado }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

//--------------------------------------------------------------------------

  const updateGuest = async ({ id, invitado, acompanantes }) => {
    try {
      const { data } = await rsvpApi.put(`/guest/${id}`, {
        confirmado: invitado.confirmado,
        tipoMenu: invitado.tipoMenu,
        condicionAlimenticia: invitado.condicionAlimenticia,
        acompanantes,
      });

      dispatch(onUpdateGuest(data.invitado)); 

    } catch (error) {
      dispatch(onError(
        error.response?.data?.msg || error.message || 'Error al actualizar invitado'
      ));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);  
    }
  };

//--------------------------------------------------------------------------

const initlogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
};

//--------------------------------------------------------------------------

  return {
    status,
    invitado,
    errorMessage,

    checkAuthToken,
    login,
    updateGuest,
    initlogout
  };

};
