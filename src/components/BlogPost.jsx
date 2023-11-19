import React from "react";

const BlogPost = ({ post }) => {
  return (
    <div className="border-b pb-4 mb-8">
      <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 break-all">{post.titulo}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-600 break-all">{post.descricao}</p>
      <a href={`/blog/${post.id}`} className="mt-4 text-sm font-semibold leading-6 text-blue-500 hover:text-blue-700 hover:underline">
        Ler mais
      </a>
    </div>
  );
};

export default BlogPost;