import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const UserDetails = () => {
    const { id: userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUser(data.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, [userId]);

    const getUserType = (permissionId) => {
        return permissionId === 1 ? 'Comum' : permissionId === 2 ? 'Admin' : 'Não definido';
      };

    return (
        <div className="w-full h-screen flex justify-center items-start my-16">
            <div className="bg-white shadow-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">Detalhes do Usuário</h2>
                {user ? ( 
                    <div className="mb-4">
                        <p><span className="font-semibold">Nome:</span> {user.name}</p>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Telefone:</span> {user.phone_number}</p>
                        <p><span className="font-semibold">CPF:</span> {user.cpf}</p>
                        <p><span className="font-semibold">Tipo de Usuário:</span> {getUserType(user.permission_id)}</p>
                        <Link to={`/user-edit/${user.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 inline-block">
                            Editar
                        </Link>
                    </div>
                ) : (
                    <p>Carregando informações do usuário...</p>
                )}
            </div>
        </div>

    );
};

export default UserDetails;
