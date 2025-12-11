import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyMemes = () => {
  const [memes, setMemes] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchMyMemes = async () => {
    const res = await api.get("/memes/my");
    setMemes(res.data);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchMyMemes();
    // eslint-disable-next-line
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meme?")) return;
    await api.delete(`/memes/${id}`);
    fetchMyMemes();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Memes</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={`http://localhost:5000${meme.image_url}`}
              alt={meme.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold">{meme.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{meme.caption}</p>
              <button
                onClick={() => handleDelete(meme.id)}
                className="px-3 py-1 text-sm bg-red-500 text-black rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {memes.length === 0 && (
          <p className="text-gray-400 col-span-full">
            You haven't uploaded any memes yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyMemes;
