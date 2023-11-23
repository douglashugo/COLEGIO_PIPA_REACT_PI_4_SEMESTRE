import { Link } from "react-router-dom";
import React from "react";

const BlogPost = ({ post }) => {
  const descriptionStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 3, // Define o número de linhas desejado
  };

  return (
    <div className="border-b pb-4 mb-8">
      <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 break-all">{post.titulo}</h2>
      <p style={descriptionStyle} className="mt-2 text-sm leading-6 text-gray-600 break-all">{post.descricao}</p>
      <Link to={`/posts/${post.id}`} className="mt-4 text-sm font-semibold leading-6 text-blue-500 hover:text-blue-700 hover:underline">
        Ler mais
      </Link>
    </div>
  );
};

export default BlogPost;