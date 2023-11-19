import React, { useState, useEffect } from "react";
import BlogPost from "../../components/BlogPost";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = localStorage.getItem("formData");
      if (data) {
        const posts = JSON.parse(data);
        
        setPosts(posts);
      } else {
        []
      }
    };
    fetchPosts()
  }, []);

  console.log(posts);

  return (
    <div className="w-full h-max flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 text-center">Blog</h1>
      {posts.length > 0 ? (
        <div className="max-w-md p-4">
          {posts.map((post, index) => (
            <BlogPost key={index} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center">Nenhum post encontrado.</p>
      )}
    </div>
  );
};

export default Home;