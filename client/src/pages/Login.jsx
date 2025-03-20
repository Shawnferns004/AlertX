import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Siren, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-md mx-auto">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <div className="relative">
              <Siren className="w-7 h-7 sm:w-8 sm:h-8 transform transition-all duration-500" />
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }} className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome back to A!ert-X</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 px-4">Sign in to your account to report violations</p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-lg rounded-2xl border border-gray-100">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 border border-red-400 text-red-700 px-3 py-2 text-sm rounded-lg">{error}</div>}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 transition-all">Sign in</motion.button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Don't have an account? <span onClick={() => navigate('/register')} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Sign up now</span></p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
