import React, { createContext, useState, useContext } from 'react';

import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("grok_user")
      ? JSON.parse(localStorage.getItem("grok_user"))
      : null
  );
  const [token, setToken] = useState(localStorage.getItem("grok_token") || null);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("grok_token", res.data.token);
    localStorage.setItem("grok_user", JSON.stringify(res.data.user));

    // after login, update location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            await api.put(
              "/auth/location",
              {
                location_lat: pos.coords.latitude,
                location_long: pos.coords.longitude,
              },
              {
                headers: { Authorization: `Bearer ${res.data.token}` },
              }
            );
          } catch (err) {
            console.log("Location update failed", err);
          }
        },
        (err) => console.log("Geolocation error", err)
      );
    }
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("grok_token", res.data.token);
    localStorage.setItem("grok_user", JSON.stringify(res.data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("grok_token");
    localStorage.removeItem("grok_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
