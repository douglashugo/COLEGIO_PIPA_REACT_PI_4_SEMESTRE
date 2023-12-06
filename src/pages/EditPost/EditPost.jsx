import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Input, TextareaAutosize } from "@mui/material";
import axiosInstance from "../../../axiosConfig";


const EditPost = () => {

    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        category_id: '',
        tag_id: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`https://colegiopipabackend.brunorisso.com/api/posts/${postId}`);
                const data = await response.data;
                if (!data.success) {
                    throw new Error('Failed to fetch data');
                }

                setPost(data.data[0]);
                setPostData({
                    title: data.data[0].title,
                    description: data.data[0].description,
                    category_id: data.data[0].category_id.toString(),
                    tag_id: data.data[0].tag_id.toString()
                });

            } catch (error) {
                console.error('Erro ao buscar informações do post:', error);
                // Lidar com erros...
            }
        };

        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };


    const handleSave = async () => {

        try {

            const formData = new FormData();

            formData.append("title", postData.title);
            formData.append("description", postData.description);
            formData.append("category_id", postData.category_id);
            formData.append("tag_id", postData.tag_id);

            const response = await axiosInstance.post(`https://colegiopipabackend.brunorisso.com/api/posts/update/${postId}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                setSuccessMessage('Conteúdo atualizado com sucesso!');
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage('Erro ao atualizar o conteúdo');
                console.error('Erro ao atualizar o conteúdo:', response.statusText);
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Erro ao realizar a requisição');
            console.error('Erro ao realizar a requisição:', error);
        }
    };

    if (!post) {
        return <p className="w-full h-screen flex justify-center items-start my-16 text-xl">Carregando informações do conteúdo...</p>;
    }

    return (
        // Estrutura do formulário de edição semelhante ao componente CreatePost
        <div className="w-full h-max flex justify-center items-start my-16">
            <div className="w-full max-w-md p-4">
                <div className="border-b pb-4">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center">Edição de Conteúdo</h1>
                </div>

                <div className="w-full h-max flex flex-col md:flex-column justify-between bg-white shadow-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div>
                        {/* Campos do formulário preenchidos com as informações do post */}
                        <label className="flex flex-col mt-4">
                            <span htmlFor="titulo">Título:</span>
                            <Input
                                name="title"
                                value={postData.title}
                                onChange={handleChange}
                                type="text"
                                placeholder="Digite o título do conteúdo"
                            />
                        </label>

                        <label className="flex flex-col mt-6 rounded-md">
                            <span htmlFor="descricao">Descrição:</span>
                            <TextareaAutosize
                                name="description"
                                value={postData.description}
                                onChange={handleChange}
                                type="text"
                                placeholder="Descreva o conteúdo"
                                maxRows={4}
                            />
                        </label>
                        <label className="flex flex-col mt-6">
                            <span htmlFor="categoria">Categoria:</span>
                            <select
                                name="category_id"
                                value={postData.category_id}
                                onChange={handleChange}
                                className="rounded-md"
                            >
                                <option value="2">Avisos</option>
                                <option value="1">Dicas</option>
                            </select>
                        </label>

                        <label className="flex flex-col mt-6">
                            <span htmlFor="tags">Tags:</span>
                            <select
                                name="tag_id"
                                value={postData.tag_id}
                                onChange={handleChange}
                                className="rounded-md"
                            >
                                <option value="2">Atividade física</option>
                                <option value="1">Alimentação</option>
                            </select>
                        </label>

                        <div className="w-full mt-6">
                            <button
                                type="submit"
                                onClick={handleSave}
                                className="mt-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            >
                                Salvar
                            </button>
                            {successMessage && <p className="mt-5 text-center bg-green-200 text-green-800 p-3 rounded-md mb-5">{successMessage}</p>}
                            {errorMessage && <p className="error mt-5 text-center bg-red-200 text-red-800 p-3 rounded-md mb-5">{errorMessage}</p>}
                        </div>
                        {/* Possíveis mensagens de erro ou sucesso... */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
