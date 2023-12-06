import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('https://colegiopipabackend.brunorisso.com/api/login', { email, password });

      if (response.data.success) {
        const token = response.data.data;
        localStorage.setItem('token', token);

        // Obtém detalhes do usuário com o token e o email
        const userDetails = await AuthService.getUserDetails(token, email);

        if (userDetails && userDetails.permission_id) {
          localStorage.setItem('permission_id', userDetails.permission_id);
        }
      }

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to login');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permission_id');
  },

  getUserDetails: async (token, email) => {
    try {
      const userResponse = await axios.get(`https://colegiopipabackend.brunorisso.com/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (userResponse.data && userResponse.data.data && userResponse.data.data.length > 0) {
        const users = userResponse.data.data;
        const foundUser = users.find(user => user.email === email);

        if (foundUser) {
          return foundUser;
        } else {
          throw new Error('User details not found');
        }
      } else {
        throw new Error('User details not found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error('Failed to fetch user details');
    }
  }
};

export default AuthService;
