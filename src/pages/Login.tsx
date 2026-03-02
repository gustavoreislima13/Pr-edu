import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate(role === 'admin' ? '/admin' : '/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-900 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2000&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-md border border-gold-500/30 p-8 rounded-2xl shadow-2xl shadow-gold-500/10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-gold-500 mb-2">Bem-vindo de Volta</h2>
          <p className="text-gray-400 text-sm">Insira seus dados para acessar sua conta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Endereço de E-mail</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="nome@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Conta</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                  role === 'customer'
                    ? 'bg-gold-600 text-black border-gold-600'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                  role === 'admin'
                    ? 'bg-emerald-700 text-white border-emerald-600'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 rounded-lg shadow-lg hover:shadow-gold-500/20 transition-all duration-300 flex items-center justify-center group"
          >
            Entrar <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Não tem uma conta? <a href="#" className="text-gold-500 hover:underline">Cadastre-se</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
