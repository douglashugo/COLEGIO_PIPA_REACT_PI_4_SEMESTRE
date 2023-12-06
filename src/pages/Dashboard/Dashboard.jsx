import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados

    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('https://colegiopipabackend.brunorisso.com/api/posts');
            const data = await response.data;

            if (data && data.success && data.data && Array.isArray(data.data)) {
                setPosts(data.data);
            } else {
                console.error('Dados de posts ausentes ou em formato inválido na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        } finally {
            setLoading(false); // Marca como falso após o término da busca
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDeletePosts = async (postId) => {
        try {
            const response = await axiosInstance.delete(`https://colegiopipabackend.brunorisso.com/api/posts/delete/${postId}`);
            const data = response.data;

            if (data.success) {
                fetchPosts();
                console.log('Post excluído com sucesso!');
            } else {
                console.error('Erro ao excluir post:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao realizar a requisição:', error);
        }
    };

    return (
        <div className="container h-screen mx-auto p-4 my-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Gerenciamento de Conteúdo</h1>
            <div>
                {loading ? ( // Mostra um indicador de carregamento enquanto os dados estão sendo buscados
                    <p className="text-center text-xl">Carregando posts...</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <li key={post.id} className="border p-4 rounded-md shadow-md">
                                <div className="mb-2">{post.title}</div>
                                <div className="flex space-x-2">
                                    <Link to={`/posts/${post.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                        Ver Detalhes
                                    </Link>
                                    <Link to={`/posts-edit/${post.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                                        Editar
                                    </Link>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDeletePosts(post.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
