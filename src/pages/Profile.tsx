import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';
import { Package, Clock, CheckCircle, Truck, User, Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, orders, wishlist, products, toggleWishlist, addToCart } = useStore();

  if (!user) {
    return <div className="text-white text-center py-20">Por favor, faça login para ver seu perfil.</div>;
  }

  // Mock user orders (filter from all orders for demo purposes, or just show all if role is customer)
  // In a real app, we'd filter by user ID. Here we'll just show a subset for the demo user.
  const userOrders = orders.slice(0, 3); 
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-black-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-8 flex items-center space-x-6 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-600 to-gold-400 rounded-full flex items-center justify-center text-black font-bold text-3xl shadow-lg shadow-gold-500/20">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white mb-1">{user.name}</h1>
            <p className="text-gray-400 flex items-center">
              <User size={16} className="mr-2" /> {user.email}
            </p>
            <span className="inline-block mt-3 px-3 py-1 bg-emerald-900/50 text-emerald-400 text-xs rounded-full border border-emerald-500/30 uppercase tracking-wider">
              Membro VIP
            </span>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-gold-500 mb-6 flex items-center">
            <Heart className="mr-2" size={24} /> Minha Lista de Desejos
          </h2>
          {wishlistProducts.length === 0 ? (
            <p className="text-gray-500 italic">Sua lista de desejos está vazia. Explore nossa coleção para adicionar seus favoritos.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/5 rounded-xl border border-white/10 overflow-hidden flex"
                >
                  <div className="w-24 h-24 bg-gray-800 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-serif">{product.name}</h3>
                        <p className="text-xs text-gray-400">{product.category}</p>
                      </div>
                      <span className="text-gold-500 font-medium">R$ {product.price}</span>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remover da lista de desejos"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex items-center px-3 py-1 bg-gold-600 text-black text-xs font-bold rounded hover:bg-white transition-colors"
                      >
                        <ShoppingBag size={14} className="mr-1" /> Adicionar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Order History */}
        <h2 className="text-2xl font-serif text-gold-500 mb-6 flex items-center">
          <Package className="mr-2" size={24} /> Histórico de Pedidos
        </h2>
        <div className="space-y-6">
          {userOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-gold-500/30 transition-colors"
            >
              <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ID do Pedido</p>
                  <p className="text-white font-mono">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Data</p>
                  <p className="text-white">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
                  <p className="text-gold-500 font-medium">R$ {order.total}</p>
                </div>
                <div>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-emerald-900/30 text-emerald-400' :
                    order.status === 'Shipped' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {order.status === 'Delivered' && <CheckCircle size={14} className="mr-1" />}
                    {order.status === 'Shipped' && <Truck size={14} className="mr-1" />}
                    {order.status === 'Processing' && <Clock size={14} className="mr-1" />}
                    {order.status === 'Delivered' ? 'Entregue' : order.status === 'Shipped' ? 'Enviado' : 'Processando'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 bg-black/20">
                <h4 className="text-sm text-gray-400 mb-4">Itens</h4>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">
                        ID do Perfume: {item.perfumeId} <span className="text-gray-600">x{item.quantity}</span>
                      </span>
                      {/* In a real app we would look up the product name here */}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
