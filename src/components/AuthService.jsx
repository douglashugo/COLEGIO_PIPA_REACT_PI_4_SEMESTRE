import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post('https://colegiopipabackend.brunorisso.com/api/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default AuthService;
