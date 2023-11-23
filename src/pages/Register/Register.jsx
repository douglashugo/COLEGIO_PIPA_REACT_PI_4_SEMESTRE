import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        tipoUsuario: 'comum',
        senha: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados do formulário para o backend ou executar a lógica necessária
        console.log(formData); // Exemplo: console.log para exibir os dados no console
        // Limpar os campos após o envio dos dados (opcional)
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            cpf: '',
            tipoUsuario: 'comum',
            senha: '',
        });
    };

    return (
        <div className="w-full h-screen max-w-md mx-auto my-16">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center mb-4">Cadastrar Usuário</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                        Nome:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </div>
        
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
                        Telefone:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="telefone"
                        type="text"
                        placeholder="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                        CPF:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cpf"
                        type="text"
                        placeholder="CPF"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoUsuario">
                        Tipo de Usuário:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tipoUsuario"
                        name="tipoUsuario"
                        value={formData.tipoUsuario}
                        onChange={handleChange}
                    >
                        <option value="comum">Comum</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                        Senha:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="senha"
                        type="password"
                        placeholder="Senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
