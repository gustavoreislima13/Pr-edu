import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-serif text-black mb-4">Sua Sacola está Vazia</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Parece que você ainda não escolheu sua nova assinatura olfativa. Explore nossa coleção exclusiva.
        </p>
        <Link to="/shop" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors">
          Explorar Coleção
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-black mb-8 border-b border-gray-100 pb-4">Sua Sacola ({cart.length})</h1>

        <div className="bg-white">
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 border-b border-gray-100 flex items-center gap-6"
            >
              <div className="w-24 h-24 bg-gray-50 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-serif text-black mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{item.category}</p>
                <p className="text-sm text-black font-medium">R$ {item.price}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                   <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Qtd</span>
                   <span className="text-sm font-medium">{item.quantity}</span>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          <div className="mt-8 bg-gray-50 p-8 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-sm uppercase tracking-widest">Subtotal</span>
              <span className="text-2xl font-serif text-black">R$ {total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
              <span className="text-gray-500 text-sm uppercase tracking-widest">Frete</span>
              <span className="text-sm text-green-600 font-bold uppercase tracking-wider">Grátis</span>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-black font-bold text-sm uppercase tracking-widest">Total</span>
              <span className="text-3xl font-serif text-black">R$ {total.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button 
                onClick={clearCart}
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors border border-transparent hover:border-black"
              >
                Esvaziar Sacola
              </button>
              <button className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto">
                Finalizar Compra <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
