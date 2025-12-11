import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import MemeCard from "../components/MemeCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState("AI");
  const { user } = useAuth();

  const fetchMemes = async () => {
    try {
      const res = await api.get("/memes", {
        params: { search, category, sort },
      });
      setMemes(res.data);
      console.log("Fetched memes:", res.data);
    } catch (err) {
      console.error("Failed to fetch memes", err);
    }
  };

  useEffect(() => {
    fetchMemes();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchMemes();
  };

  const handleReact = async (memeId, reactionType) => {
    try {
      await api.post("/reactions", {
        meme_id: memeId,
        reaction_type: reactionType,
      });
      fetchMemes();
    } catch (err) {
      console.error("Reaction failed", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !caption) return;
    if (caption.length > 140) {
      alert("Caption must be under 140 characters");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("category", uploadCategory);

    try {
      await api.post("/memes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setCaption("");
      setFile(null);
      fetchMemes();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            GrokMemeHub: Where AI Meets Chaos
          </h1>
          <p className="text-gray-300 mb-4">
            Share AI-powered memes, discover Grok-inspired humor, and
            brainstorm futuristic ideas — all with the power of laughter.
          </p>
          <audio controls className="w-full mb-2">
            <source
              src={process.env.PUBLIC_URL + "/grok-intro.mp3"}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Grok's Funniest Moments"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </section>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 items-center bg-gray-800 p-4 rounded-lg"
      >
        <input
          type="text"
          placeholder="Search by title or caption..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Categories</option>
          <option value="AI">AI</option>
          <option value="Grok">Grok</option>
          <option value="xAI">xAI</option>
          <option value="Futuristic">Futuristic</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Newest</option>
          <option value="trending">Trending</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-400"
        >
          Search
        </button>
      </form>

      {user && (
        <form
          onSubmit={handleUpload}
          className="bg-gray-800 p-4 rounded-lg space-y-3"
        >
          <h2 className="text-xl font-semibold mb-2">Upload a Meme</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Title"
              className="px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="AI">AI</option>
              <option value="Grok">Grok</option>
              <option value="xAI">xAI</option>
              <option value="Futuristic">Futuristic</option>
            </select>
          </div>
          <textarea
            placeholder="Caption (max 140 chars)"
            className="w-full px-3 py-2 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            maxLength={140}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-400"
          >
            Upload
          </button>
        </form>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} onReact={handleReact} />
        ))}
        {memes.length === 0 && (
          <p className="text-gray-400 col-span-full">
            No memes found. Be the first to upload!
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
