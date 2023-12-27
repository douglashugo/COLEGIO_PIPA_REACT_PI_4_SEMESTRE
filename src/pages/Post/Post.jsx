import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosConfig';

const Post = () => {
    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // Novo estado para indicar se o post está sendo carregado

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`https://colegiopipabackend.brunorisso.com/api/posts/${postId}`);
                const data = await response.data;
                console.log(data.data[0]);
                if (!data.success) {
                    throw new Error('Failed to fetch data');
                }
                setPost(data.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Define loading como false após o término da busca
            }
        };

        fetchPost();
    }, [postId]);

    return (
        <div className="w-full h-screen flex justify-center items-start my-16">
            <div className="w-full max-w-2xl p-4">
                {loading ? ( // Mostra um indicador de carregamento enquanto o post está sendo buscado
                    <p className="text-center text-xl">Carregando página...</p>
                ) : (
                    post ? (
                        <div>
                            <h1 className="text-4xl font-semibold leading-1 text-gray-900 text-center mb-10">{post.title}</h1>
                            {post.category_id == 1 && (<span className="p-4 bg-blue-400 rounded mx-4">Dicas</span>)}
                            {post.category_id == 2 && (<span className="p-4 bg-red-400 rounded mx-4">Avisos</span>)}

                            {post.tag_id == 1 && (<span className="p-4 bg-yellow-400 rounded">Alimentação</span>)}
                            {post.tag_id == 2 && (<span className="p-4 bg-green-400 rounded">Atividade física</span>)}


                            {post.image_id && (
                                <div className="flex justify-center mt-8">
                                    <img src={"data:image/jpg;base64," + post.image.image} alt="Imagem do post" className="max-w-full h-auto" />
                                </div>
                            )}
                            <p className="mt-7 text-lg leading-1 text-gray-600 text-center max-w-2xl m-auto mb-12">{post.description}</p>
                        </div>
                    ) : (
                        <p className="w-full h-max flex justify-center items-start my-8">Post não encontrado</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Post;
