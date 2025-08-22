import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/loginPage";
import { GuestsPage } from "../pages/guestsPage";
import { SuccessPage } from "../pages/successPage";


export const AppRouter = () => {

  const [accessCode, setAccessCode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const verifyAccessCode = (code) => {

    if (code === "1234") {
      setAccessCode(code);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<LoginPage verifyAccessCode={verifyAccessCode} />}/>
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
