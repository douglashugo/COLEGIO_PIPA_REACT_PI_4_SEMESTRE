import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

const Dashboard = () => {
    const [posts, setPosts] = useState([]); // Estado para armazenar posts

    // Função para carregar os posts (simulando uma chamada à API)
    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('https://colegiopipabackend.brunorisso.com/api/posts');
            const data = await response.data;

            // Verifica se a resposta da API tem a chave "data" e se contém uma matriz de usuários
            if (data && data.success && data.data && Array.isArray(data.data)) {
                setPosts(data.data); // Atualiza o estado com os usuários obtidos da chave "data"
            } else {
                console.error('Dados de posts ausentes ou em formato inválido na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        }
    };

    // Carregar os usuários ao montar o componente
    useEffect(() => {
        fetchPosts();
    }, []);



    // Função para excluir um usuário
    const handleDeletePosts = async (postId) => {
        // Lógica para excluir um usuário na API
        try {
            // Substitua essa lógica pelo código de chamada à sua API real para exclusão do usuário
            const response = await axiosInstance.delete(`https://colegiopipabackend.brunorisso.com/api/posts/delete/${postId}`);
            const data = response.data;

            if (data.success) {
                // Atualiza a lista de usuários após a exclusão
                fetchPosts();
                setSelectedUser(null); // Limpa o estado de usuário selecionado
                console.log('Usuário excluído com sucesso!');
            } else {
                console.error('Erro ao excluir usuário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao realizar a requisição:', error);
        }
    };

    return (
        <div className="container h-screen mx-auto p-4 my-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Gerenciamento de Conteúdo</h1>
            <div>
                {/* Lista de Usuários */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <li key={post.id} className="border p-4 rounded-md shadow-md">
                            <div className="mb-2">{post.title}</div>
                            <div className="flex space-x-2">
                                <Link to={`/posts/${post.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                    Ver Detalhes
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
            </div>
        </div>
    );
};

export default Dashboard;