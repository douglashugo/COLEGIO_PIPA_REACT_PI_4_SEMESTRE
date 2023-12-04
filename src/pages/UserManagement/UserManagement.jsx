import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const UserManagement = () => {
    const [users, setUsers] = useState([]); // Estado para armazenar usuários

    // Função para carregar os usuários (simulando uma chamada à API)
    const fetchUsers = async () => {
        try {
            const response = await fetch('https://colegiopipabackend.brunorisso.com/api/users');
            const data = await response.json();

            // Verifica se a resposta da API tem a chave "data" e se contém uma matriz de usuários
            if (data && data.success && data.data && Array.isArray(data.data)) {
                setUsers(data.data); // Atualiza o estado com os usuários obtidos da chave "data"
            } else {
                console.error('Dados de usuários ausentes ou em formato inválido na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Carregar os usuários ao montar o componente
    useEffect(() => {
        fetchUsers();
    }, []);



    // Função para excluir um usuário
    const handleDeleteUser = async (userId) => {
        // Lógica para excluir um usuário na API
        try {
            // Substitua essa lógica pelo código de chamada à sua API real para exclusão do usuário
            const response = await fetch(`https://colegiopipabackend.brunorisso.com/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Atualiza a lista de usuários após a exclusão
                fetchUsers();
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
            <h1 className="text-3xl font-bold mb-8 text-center">Gerenciamento de Usuários</h1>
            <div>
                {/* Lista de Usuários */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <li key={user.id} className="border p-4 rounded-md shadow-md">
                            <div className="mb-2">{user.name}</div>
                            <div className="flex space-x-2">
                                <Link to={`/user-details/${user.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                    Ver Detalhes
                                </Link>
                                <Link to={`/user-edit/${user.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                                    Editar
                                </Link>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleDeleteUser(user.id)}
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

export default UserManagement;