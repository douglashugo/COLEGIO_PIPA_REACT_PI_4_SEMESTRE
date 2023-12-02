import React, { useState, useEffect } from "react";
import BlogPost from "../../components/BlogPost";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts");

        if (response.data && response.data.data) {
          const fetchedPosts = response.data.data;
          setPosts(fetchedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="w-full h-screen flex flex-col items-center my-16">
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