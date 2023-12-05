import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o axios para fazer requisições HTTP
import { Navigate, useNavigate } from 'react-router-dom'; // Importando Navigate do react-router-dom
import AuthService from '../../components/AuthService';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');;
        if (token) {
            navigate('/home');
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const [erro, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false); // Variável de estado para mostrar/ocultar o pop-up de erro
    const [redirectToHome, setRedirectToHome] = useState(false); // Estado para controlar o redirecionamento

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificando se os campos estão preenchidos
        if (!formData.email || !formData.senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            setError(''); // Resetando o erro caso tenha sido exibido anteriormente

            const response = await AuthService.login(formData.email, formData.senha);
            console.log('Token: ', response.data);

            if (response.success) {
                console.log('Usuário logado');
                setRedirectToHome(true); // Ativa o redirecionamento para '/home'
            } else {
                setError('Usuário ou senha incorretos.');
                setShowErrorPopup(true); // Mostrando o pop-up de erro
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            setError('Erro ao buscar usuário. Por favor, tente novamente.');
            setShowErrorPopup(true); // Mostrando o pop-up de erro
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false); // Função para fechar o pop-up de erro
    };

    // Se redirectToHome for true, redireciona para '/home'
    if (redirectToHome) {
        return <Navigate to="/home" />;
    }
    
    return (
        <div>
            <div className="w-full h-screen max-w-md mx-auto my-16">
                <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center mb-4">Faça seu login</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {showErrorPopup && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Erro:</strong>
                            <span className="block sm:inline"> {erro}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeErrorPopup}>
                                <svg
                                    className="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Fechar</title>
                                    <path
                                        fillRule="evenodd"
                                        d="M14.348 5.652a.5.5 0 0 1 0 .707L10.06 10l4.288 4.641a.5.5 0 1 1-.708.707L9.353 10.707a.5.5 0 0 1 0-.707l4.287-4.288a.5.5 0 0 1 .708 0z"
                                    />
                                </svg>
                            </span>
                        </div>
                    )}
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
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
