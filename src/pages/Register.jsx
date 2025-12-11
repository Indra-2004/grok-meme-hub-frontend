import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-black rounded hover:bg-orange-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
