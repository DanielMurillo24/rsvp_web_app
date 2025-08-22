import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({ verifyAccessCode }) => {

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyAccessCode(code)) {
      navigate("/guests");
    } else {
      setError("Código de acceso incorrecto");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Ingresar Código</h2>
              {error && <div className="alert alert-danger">{error}</div>}
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
    </div>
  );
}