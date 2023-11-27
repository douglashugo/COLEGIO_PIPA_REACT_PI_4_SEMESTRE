import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { id: postId } = useParams(); // Adicionado o 'useParams' para obter o ID da rota
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/posts/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const selectedPost = data.data.find((post) => post.id.toString() === postId);
                setPost(selectedPost);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPost();
    }, [postId]);

    return (
        <div className="w-full h-screen flex justify-center items-start my-16">
            <div className="w-full max-w-md p-4">
                {post ? (
                    <div>
                        <h1 className="text-4xl font-semibold leading-7 text-gray-900 text-center break-all mb-10">{post.title}</h1>
                        <p className="mt-1 text-lg leading-6 text-gray-600 text-center break-all">{post.description}</p>
                        {post.image_url && (
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