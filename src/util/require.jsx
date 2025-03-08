import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const isAuthenticated = true; // !!localStorage.getItem("tokenrc"); // Example check

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
