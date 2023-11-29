import React from 'react'
import { useState, useEffect } from 'react'


const Login = () => {


  const[email, setEmail] = useState("")
  const[senha, setSenha] = useState("")
  const[erro, setError] = useState("")

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    tipoUsuario: 'comum',
    senha: '',
});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Form submitted:', formData);
    // Reset the form data after submission if needed
    setFormData({ email: '', senha: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="w-full h-screen max-w-md mx-auto my-16">
              <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center mb-4">Faça seu login</h1>  
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">      
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
                          type="submit">
                          Entrar
                      </button>
                  </div>
              </form>
      </div>
    </div>
  )
}

export default Login;