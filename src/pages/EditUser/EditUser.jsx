import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://colegiopipabackend.brunorisso.com/api/users/${userId}`);
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
      const response = await fetch(`https://colegiopipabackend.brunorisso.com/api/users/update/${userId}`, {
        method: 'PUT', // Ou outro método dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setSuccessMessage('Usuário atualizado com sucesso!');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Erro ao atualizar usuário');
        console.error('Erro ao atualizar usuário:', response.statusText);
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Erro ao realizar a requisição');
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  

  if (!user) {
    return <p className="w-full h-screen flex justify-center items-start my-16">Carregando informações do usuário...</p>;
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
        {successMessage && <p className="mt-5 text-center bg-green-200 text-green-800 p-3 rounded-md mb-5">{successMessage}</p>}
        {errorMessage && <p className="error mt-5 text-center bg-red-200 text-red-800 p-3 rounded-md mb-5">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default EditUser;
