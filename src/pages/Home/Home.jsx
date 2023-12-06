import React, { useState, useEffect } from "react";
import BlogPost from "../../components/BlogPost";
import axios from "axios";
import axiosInstance from "../../../axiosConfig";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("https://colegiopipabackend.brunorisso.com/api/posts");

        if (response.data && response.data.data) {
          const fetchedPosts = response.data.data;
          setPosts(fetchedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false); // Define loading como false após o término da busca
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="w-full h-screen flex flex-col items-center my-16">
      {loading ? ( // Mostra um indicador de carregamento enquanto os dados estão sendo buscados
        <p className="text-center text-xl">Carregando página...</p>
      ) : (
        posts.length > 0 ? (
          <div className="max-w-lg p-4">
            {posts.map((post, index) => (
              <BlogPost key={index} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center">Nenhum post encontrado.</p>
        )
      )}
    </div>
  );
};

export default Home;