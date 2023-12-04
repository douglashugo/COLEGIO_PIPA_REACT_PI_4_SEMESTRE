import React, { useState } from 'react';

const Register = () => {

    const [permission, setPermission] = useState(["Comum", "Admin"]);
    const [permissionSelecionada, setPermissionSelecionada] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const [erroCadastro, setErroCadastro] = useState(false);
    const [formError, setFormError] = useState("");
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        tipoUsuario: '',
        senha: '',
        repetirSenha: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };  

        const handleSubmit = async (e) => {
            e.preventDefault();
            setFormError("");

            if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf || !formData.tipoUsuario || !formData.senha || !formData.repetirSenha) {
                setFormError("Por favor, preencha todos os campos");
                return;
            }

            // Verificar se as senhas coincidem antes de enviar o formulário
            if (formData.senha !== formData.repetirSenha) {
                setPasswordError(true);
                return;
            }

            const requestBody = {
                name: formData.nome,
                email: formData.email,
                phone_number: formData.telefone,
                cpf: formData.cpf,
                permission_id: getPermissionId(permissionSelecionada),
                password: formData.senha,
            };



            try {
                const response = await fetch('https://colegiopipabackend.brunorisso.com/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    // Lógica para lidar com sucesso (ex: redirecionamento, exibição de mensagem)
                    setCadastroSucesso(true); // Define o estado para mostrar a mensagem de sucesso
                    setErroCadastro(false);
                    console.log('Usuário cadastrado com sucesso!');
                } else {
                    // Lógica para lidar com erro na requisição
                    setErroCadastro(true);
                    setCadastroSucesso(false);
                    console.error('Erro ao cadastrar usuário:', response.statusText);
                }
            } catch (error) {
                // Lógica para lidar com erro de rede ou outros erros
                console.error('Erro ao realizar a requisição:', error);
            }
        };

        const getPermissionId = (tipoUsuario) => {
            // Mapeamento de tipos de usuário para IDs correspondentes
            // Certifique-se de ter adicionado todas as categorias conforme necessário
            const permissionId = {
                Comum: 1,
                Admin: 2,
                // Adicione outras categorias conforme necessário
            };
            return permissionId[tipoUsuario] || null; // Retornar null ou outro valor padrão para lidar com casos não mapeados
        };

        return (
            <div className="w-full h-max max-w-md mx-auto my-16">
                <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-center mb-4">Cadastrar Usuário</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                            value={permissionSelecionada}
                            onChange={(e) => setPermissionSelecionada(e.target.value)}
                        >
                            <option value="">
                                Selecione uma permissão
                            </option>
                            {permission.map((permission) => (
                                <option key={permission} value={permission}>
                                    {permission}
                                </option>
                            ))}
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

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repetirSenha">
                            Repetir Senha:
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
                            id="repetirSenha"
                            type="password"
                            placeholder="Repetir Senha"
                            name="repetirSenha"
                            value={formData.repetirSenha}
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
                    {cadastroSucesso && (
                        <p className="mt-5 text-center bg-green-200 text-green-800 p-3 rounded-md mb-5">
                            Usuário cadastrado com sucesso!
                        </p>
                    )}
                    {erroCadastro && (
                        <p className="error mt-5 text-center bg-red-200 text-red-800 p-3 rounded-md mb-5">
                            Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.
                        </p>
                    )}
                    {passwordError && (
                        <p className="error mt-5 text-center bg-red-200 text-red-800 p-3 rounded-md mb-5">
                            Senhas divergentes!
                        </p>
                    )}
                    {formError && <p className="error mt-5 text-center bg-red-200 text-red-800 p-3 rounded-md mb-5">{formError}</p>}
                </form>
            </div>
        );
    };

    export default Register;
