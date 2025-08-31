import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/loginPage";
import { GuestsPage } from "../pages/guestsPage";
import { SuccessPage } from "../pages/successPage";
import { useGuestStore } from "../hook/useGuestStore";


export const AppRouter = () => {

  const {status, checkAuthToken} = useGuestStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/guests" element={<GuestsPage/>}/>
          <Route path="/success" element={<SuccessPage/>}/>
          <Route path="/*" element={<Navigate to="/guests" />}/>
        </>
      )}
    </Routes>
  );
};
