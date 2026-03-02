import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, ArrowLeft, Star, Truck, ShieldCheck, Share2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-serif text-black mb-4">Produto não encontrado</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="text-gold-600 hover:text-black transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Voltar para a Loja
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      {/* Breadcrumb / Back */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gray-50 aspect-[3/4] lg:aspect-square overflow-hidden rounded-lg"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.stock < 5 && (
              <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                Últimas Unidades
              </span>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.2em] text-gold-600 uppercase">
                {product.category}
              </span>
              <div className="flex text-gold-500">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
              <span className="text-xs text-gray-400">(12 avaliações)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
              {product.name}
            </h1>

            <p className="text-2xl text-black font-medium mb-6">
              R$ {product.price.toFixed(2)}
              <span className="text-sm text-gray-500 font-normal ml-2">
                em até 10x de R$ {(product.price / 10).toFixed(2)}
              </span>
            </p>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            {/* Notes */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-3">Notas Olfativas</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-600 text-sm rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-lg w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-black"
                >
                  -
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-black"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white h-12 px-8 font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 rounded-lg"
              >
                <ShoppingBag size={20} /> Adicionar à Sacola
              </button>

              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-colors ${
                  isWishlisted 
                    ? 'border-red-200 bg-red-50 text-red-500' 
                    : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black">Frete Grátis</p>
                  <p className="text-[10px] text-gray-500">Para todo o Brasil</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black">Garantia Original</p>
                  <p className="text-[10px] text-gray-500">Produto 100% Autêntico</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
