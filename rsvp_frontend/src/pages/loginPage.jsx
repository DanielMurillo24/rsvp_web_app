
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useGuestStore } from "../hook/useGuestStore";

export const LoginPage = () => {
  const [code, setCode] = useState("");

  const { login, status, errorMessage } = useGuestStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login({codigoAcceso: code});
  };

  useEffect(() => {
    if (errorMessage) {
      Swal.fire("Error de autenticación", errorMessage, "error");
    }
  }, [errorMessage]);


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 px-3">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card shadow-sm">
 
            <div className="card-body">
              <h2 className="card-title text-center">Ingresar Código</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Código de acceso"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>
            </div>
     
        </div>
      </div>
    </div>
  );
}