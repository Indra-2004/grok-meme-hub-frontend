import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" || true
  );
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-200 text-gray-900 dark:bg-gray-950 dark:text-gray-100 shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-orange-400">🤖 GrokMemeHub</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="hover:text-orange-400">
            Home
          </Link>
          {user && (
            <Link to="/my-memes" className="hover:text-orange-400">
              My Memes
            </Link>
          )}
          {!user && (
            <>
              <Link to="/login" className="hover:text-orange-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-orange-400">
                Register
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="hover:text-orange-400"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 px-2 py-1 border rounded text-sm"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-gray-900">
          <Link to="/" className="block hover:text-orange-400">
            Home
          </Link>
          {user && (
            <Link to="/my-memes" className="block hover:text-orange-400">
              My Memes
            </Link>
          )}
          {!user && (
            <>
              <Link to="/login" className="block hover:text-orange-400">
                Login
              </Link>
                <Link to="/register" className="block hover:text-orange-400">
                Register
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="block hover:text-orange-400"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => setDark(!dark)}
            className="mt-2 px-2 py-1 border rounded text-sm"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
