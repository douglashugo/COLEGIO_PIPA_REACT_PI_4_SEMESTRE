import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    telefone: '',
    cpf: '',
    permission: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUser(data.data); // Definindo o usuário retornado pela API
        setEditedUser({
          name: data.data.name,
          email: data.data.email,
          telefone: data.data.phone_number,
          cpf: data.data.cpf,
          permission: data.data.permission_id.toString(), // Convertendo para string para o select
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Aqui você deve enviar os dados editados para a API
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'PUT', // Ou outro método dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        // Lógica para lidar com o salvamento bem-sucedido
        console.log('Usuário atualizado com sucesso!');
      } else {
        console.error('Erro ao atualizar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  

  if (!user) {
    return <p>Carregando informações do usuário...</p>;
  }

  return (
    <div className="w-full h-screen flex justify-center items-start my-16">
      <div className="bg-white shadow-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-4">Editar Usuário</h2>
        <label className="block mb-4">
          <span className="font-semibold">Nome:</span>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-4">
          <span className="font-semibold">Email:</span>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-4">
          <span className="font-semibold">Telefone:</span>
          <input
            type="text"
            name="phone_number"
            value={editedUser.telefone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-4">
          <span className="font-semibold">CPF:</span>
          <input
            type="text"
            name="cpf"
            value={editedUser.cpf}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-4">
          <span className="font-semibold">Tipo de Usuário:</span>
          <select
            name="permission_id"
            value={editedUser.permission_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="1">Comum</option>
            <option value="2">Admin</option>
          </select>
        </label>
        <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default EditUser;
