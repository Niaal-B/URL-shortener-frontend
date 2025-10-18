import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = checking, true = valid, false = invalid

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        // Make API call to verify token
        await axios.get("http://localhost:8000/api/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsValid(true); // token is valid
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsValid(false); // invalid token
      }
    };

    verifyToken();
  }, []); // run only once on mount

  if (isValid === null) {
    return <div className="text-center mt-10 text-gray-600">Checking session...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
