import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { id: postId } = useParams(); // Adicionado o 'useParams' para obter o ID da rota
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const existingData = localStorage.getItem('formData');
            if (existingData) {
                const posts = JSON.parse(existingData);
                const selectedPost = posts.find((post) => post.id === postId);
                setPost(selectedPost);
            }
        };

        fetchData();
    }, [postId]);

    return (
        <div className="w-full h-screen flex justify-center items-start my-16">
            <div className="w-full max-w-md p-4">
                {post ? (
                    <div>
                        <h1 className="text-4xl font-semibold leading-7 text-gray-900 text-center break-all mb-10">{post.titulo}</h1>
                        <p className="mt-1 text-lg leading-6 text-gray-600 text-center break-all">{post.descricao}</p>
                        {post.imagem && (
                            <div className="flex justify-center mt-4">
                                <img src={post.imagem} alt="Imagem do post" className="max-w-full h-auto" />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="w-full h-max flex justify-center items-start my-8">Post não encontrado</p>
                )}
            </div>
        </div>
    );
};

export default Post;