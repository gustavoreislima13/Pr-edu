import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Filter, Heart, ArrowRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

const Shop: React.FC = () => {
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<string>('Todos');
  
  // Translate categories for display
  const categoryMap: Record<string, string> = {
    'All': 'Todos',
    'Woody': 'Amadeirado',
    'Floral': 'Floral',
    'Spicy': 'Especiado',
    'Fresh': 'Fresco',
    'Oriental': 'Oriental'
  };

  // Reverse map for filtering logic if products use English categories
  const reverseCategoryMap: Record<string, string> = {
    'Todos': 'All',
    'Amadeirado': 'Woody',
    'Floral': 'Floral',
    'Especiado': 'Spicy',
    'Fresco': 'Fresh',
    'Oriental': 'Oriental'
  };

  // Map URL params to Portuguese display categories
  const paramMap: Record<string, string> = {
    'woody': 'Amadeirado',
    'floral': 'Floral',
    'spicy': 'Especiado',
    'fresh': 'Fresco',
    'oriental': 'Oriental',
    'match': 'Oriental', // Fallback for Match collection
    'body': 'Fresco',    // Fallback for Body collection
    'exclusif': 'Amadeirado' // Fallback for Exclusif collection
  };

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && paramMap[cat.toLowerCase()]) {
      setFilter(paramMap[cat.toLowerCase()]);
    }
  }, [searchParams]);

  const categories = ['Todos', 'Amadeirado', 'Floral', 'Especiado', 'Fresco', 'Oriental'];

  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.category === reverseCategoryMap[filter] || p.category === filter);

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3 block">
            Nossa Coleção
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-6">
            Fragrâncias Exclusivas
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Explore nossa seleção de 21 essências assinadas, cada uma criada para evocar emoções profundas e memórias inesquecíveis.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-16 space-x-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap border ${
                filter === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* Badges */}
                  {product.stock < 5 && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                      Últimas Unidades
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 opacity-0 group-hover:opacity-100 duration-300"
                  >
                    <Heart 
                      size={18} 
                      className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-black'}`} 
                    />
                  </button>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} /> Adicionar
                  </button>
                </div>

                <div className="text-center flex-1 flex flex-col">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                    {categoryMap[product.category] || product.category}
                  </p>
                  <Link to={`/product/${product.id}`} className="group-hover:text-gold-600 transition-colors">
                    <h3 className="text-lg font-serif text-black mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-black font-medium">R$ {product.price}</span>
                      <span className="text-xs text-gray-400 line-through">R$ {(product.price * 1.2).toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">
                      ou 10x de R$ {(product.price / 10).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
