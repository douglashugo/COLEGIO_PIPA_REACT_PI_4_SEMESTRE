import React, { useState } from "react";
import { Select, Input, Button, TextareaAutosize } from "@mui/material";

const Cadastro = () => {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categorias, setCategorias] = useState(["Dicas", "Avisos"]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [tags, setTags] = useState(["Alimentação", "Atividade física"]);
  const [tagsSelecionada, setTagsSelecionada] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false); // Novo estado para verificar se a imagem foi carregada

  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!titulo || !descricao || !categoriaSelecionada) {
      setFormError("Por favor, preencha todos os campos");
      return;
    }

    // Criando um objeto com os dados do formulário
    const formData = {
      titulo,
      descricao,
      categoriaSelecionada,
      tagsSelecionada,
      imagem: imagem ? URL.createObjectURL(imagem) : null
    };

    // Salvando os dados no localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Reseta os campos após o envio
    setTitulo("");
    setDescricao("");
    setCategoriaSelecionada("");
    setTagsSelecionada("");
    setImagem(null);
    setImageLoaded(false); // Reinicializa o estado da imagem após o envio do formulário

  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImagem(selectedImage);
      setImageLoaded(true); // Define como verdadeiro se uma imagem for selecionada
    }
  };


  return (
    <div className="w-full h-screen flex justify-center items-start my-8">
      <div className="w-full max-w-md p-4">
        <div className="border-b  pb-4">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center">Cadastro de Conteúdo</h1>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
            Este conteúdo será exibido publicamente, então tenha cuidado com o que compartilha.
          </p>
        </div>

        <div className="w-full min-h-screen flex flex-col md:flex-column justify-between">

          <form onSubmit={handleSubmit}>
            <label className="flex flex-col mt-4">
              <span htmlFor="titulo">Título:</span>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                placeholder="Digite o título do conteúdo"
              />
            </label>

            <label className="flex flex-col mt-6 rounded-md">
              <span htmlFor="descricao">Descrição:</span>
              <TextareaAutosize
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                type="text"
                placeholder="Descreva o conteúdo"
                maxRows={4}
              />
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
              <div className="flex items-center mt-2">
                <label htmlFor="upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md transition duration-300 ease-in-out">
                  Carregar imagem
                </label>
                <input
                  id="upload"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imageLoaded && imagem && (
                  <p className="ml-3 text-gray-600">
                    {imagem.name} carregado com sucesso!
                  </p>
                )}
              </div>
            </label>

            <div className="w-full mt-6 flex justify-center ">
              <button
                type="submit"
                className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Cadastrar
              </button>
            </div>
            {formError && <p className="error mt-5 text-center">{formError}</p>}
          </form>
        </div>
      </div>
    </div>

  );
};

export default Cadastro;