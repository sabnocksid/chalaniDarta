import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const LogIn = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/login/', formData);
      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/dashboard');  
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-500">
      <div className="w-full max-w-sm p-5 rounded-lg">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-white">दर्ता चलानी System</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-lg bg-blue-500 text-white font-semibold text-center py-4 rounded-t-lg">
            User Login
          </h2>
          
          {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200 mb-4 text-sm"
              >
                Sign In
              </button>
              <a className="block text-center text-blue-400 text-sm underline cursor-pointer">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
