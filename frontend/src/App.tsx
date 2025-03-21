import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import { useGetProfileQuery } from "./redux/apis/userSlice";
import Users from "./pages/users";
import RolesPage from "./pages/roles";
import PermissionsPage from "./pages/permissions";
import Unauthorized from "./pages/unauthorized";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const { data: userProfileData } = useGetProfileQuery({}, { skip: !localStorage.getItem("token") });


  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen for token changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Protected Routes with Specific Permissions */}
          <Route element={<ProtectedRoute requiredPermission="VIEW_USERS" />}>
            <Route path="/users" element={<Users userProfileData={userProfileData} />} />
          </Route>

          <Route element={<ProtectedRoute requiredPermission="VIEW_PERMISSION" />}>
            <Route path="/permissions" element={<PermissionsPage userProfileData={userProfileData} />} />
          </Route>
          {/*  */}
          <Route element={<ProtectedRoute requiredPermission="VIEW_ROLE" />}>
            <Route path="/roles" element={<RolesPage userProfileData={userProfileData} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
