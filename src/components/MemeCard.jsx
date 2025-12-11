import React from "react";

const getImageSrc = (image_url) => {
  if (!image_url) return "";
  if (
    image_url.startsWith("http://") ||
    image_url.startsWith("https://")
  ) {
    return image_url;
  }
  return `http://localhost:5000${image_url}`;
};

const MemeCard = ({ meme, onReact }) => {
  const imgSrc = getImageSrc(meme.image_url);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {imgSrc && (
        <img
          src={imgSrc}
          alt={meme.title}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{meme.title}</h3>
          <span className="text-xs bg-orange-500 text-black px-2 py-1 rounded-full">
            {meme.category}
          </span>
        </div>
        <p className="text-sm text-gray-300 mb-3">{meme.caption}</p>
        <div className="flex justify-between items-center text-sm">
          <span>Reactions: {meme.reactions_count || 0}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onReact(meme.id, "laugh")}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              😂
            </button>
            <button
              onClick={() => onReact(meme.id, "robot")}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              🤖
            </button>
            <button
              onClick={() => onReact(meme.id, "think")}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              🤔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;
