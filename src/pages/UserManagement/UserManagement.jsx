import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from '../../../axiosConfig';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('https://colegiopipabackend.brunorisso.com/api/users');
            const data = await response.data;

            if (data && data.success && data.data && Array.isArray(data.data)) {
                setUsers(data.data);
            } else {
                console.error('Dados de usuários ausentes ou em formato inválido na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        } finally {
            setLoading(false); // Marca como falso após o término da busca
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axiosInstance.delete(`https://colegiopipabackend.brunorisso.com/api/users/delete/${userId}`);
            const data = response.data;

            if (data.success) {
                fetchUsers();
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
                {loading ? ( // Mostra um indicador de carregamento enquanto os dados estão sendo buscados
                    <p className="text-center text-xl">Carregando usuários...</p>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default UserManagement;
