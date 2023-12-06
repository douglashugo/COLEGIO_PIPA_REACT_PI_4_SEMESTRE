import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

export const EditPost = () => {

    // carregando post
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);


    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    // carregando conteudo no state
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);

            const textTags = post.tags.join(", "); //array de tag

            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue();

    const navigate = useNavigate();

    const { updateDocument, response } = useUpdateDocument("posts");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");


        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim());


        const data = {
            title,
            image,
            body,
            tags: tagsArray,
        };



        updateDocument(id, data);

        // dashboard
        navigate("/dashboard");
    };

    return (

        <div className="w-full h-max flex justify-center items-start my-16">
            <div className="w-full max-w-md p-4">
                <div className="border-b  pb-4">
                    {post && (
                        <><h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center">Edição de Conteúdo</h1><p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                            Este conteúdo será exibido publicamente, então tenha cuidado com o que compartilha.
                        </p>
                        </div>
                        <div className="w-full h-max flex flex-col md:flex-column justify-between bg-white shadow-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">

                        <form onSubmit={handleSubmit}>
                            <label className="flex flex-col mt-4">
                                <span htmlFor="titulo">Título:</span>
                                <Input
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    type="text"
                                    placeholder="Digite o novo título do conteúdo" />
                            </label>

                            <label className="flex flex-col mt-6 rounded-md">
                                <span htmlFor="descricao">Descrição:</span>
                                <TextareaAutosize
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    type="text"
                                    placeholder="Descreva o conteúdo"
                                    maxRows={4} />
                            </label>

                            <label className="flex flex-col mt-6">
                                <span htmlFor="categoria">Categoria:</span>
                                <select
                                    value={categoriaSelecionada}
                                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                                    className="rounded-md"
                                >
                                    <option value="">
                                        Selecione uma categoria
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria} value={categoria}>
                                            {categoria}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-col mt-6">
                                <span htmlFor="tags">Tags:</span>
                                <select
                                    value={tagsSelecionada}
                                    onChange={(e) => setTagsSelecionada(e.target.value)}
                                    className="rounded-md"
                                >
                                    <option value="">Selecione as tags</option>
                                    {tags.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-col mt-6">
                                <span htmlFor="imagem">Imagem:</span>
                                <img
                                    className="flex justify-center mt-4"
                                    src={post.image}
                                    alt={post.title} />
                                <div className="flex items-center mt-2">
                                    <label htmlFor="upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md transition duration-300 ease-in-out">
                                        Carregar nova imagem
                                    </label>
                                    <input
                                        id="upload"
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        onChange={handleImageChange}
                                        className="hidden" />
                                    {imageLoaded && imagem && (
                                        <p className="ml-3 text-gray-600">
                                            {imagem.name} carregado com sucesso!
                                        </p>
                                    )}
                                </div>
                            </label>

                            <div className="w-full mt-6">
                                <button
                                    type="submit"
                                    className="mt-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                >
                                    Editar
                                </button>
                            </div>
                            {formError && <p className="error mt-5 text-center bg-red-200 text-red-800 p-3 rounded-md mb-5">{formError}</p>}
                            {showSuccessAlert && (
                                <div className="mt-5 text-center bg-green-200 text-green-800 p-3 rounded-md mb-5">
                                    Conteúdo publicado com sucesso!
                                </div>
                            )}
                        </form>

                    </>
                    )};
                </div>
            </div>
        </div>
    );
};




export default EditPost;