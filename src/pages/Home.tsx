import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Truck, CreditCard, ShieldCheck, Clock, Play } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Home: React.FC = () => {
  const { products, addToCart } = useStore();
  
  // Featured products for the spotlight section
  const spotlightProduct = products.find(p => p.name.includes('Oud')) || products[0];
  const newArrivals = products.slice(0, 4);

  return (
    <div className="bg-white text-black font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-[#f9f9f9] overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="order-2 md:order-1 flex flex-col justify-center items-start space-y-6 pl-4 md:pl-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase"
            >
              Nova Coleção 2024
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-serif font-medium leading-tight text-black"
            >
              A Essência do <br/> <span className="italic text-gold-600">Luxo Árabe</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 max-w-md text-lg leading-relaxed"
            >
              Descubra fragrâncias exclusivas que capturam a alma do Oriente. 
              Notas raras, fixação incomparável e uma experiência sensorial única.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                to="/shop" 
                className="inline-block bg-black text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors duration-300"
              >
                Comprar Agora
              </Link>
            </motion.div>
          </div>
          <div className="order-1 md:order-2 h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop" 
              alt="Perfume Hero" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <Truck size={24} strokeWidth={1} className="text-gray-800" />
            <span className="text-xs font-bold uppercase tracking-wider">Frete Grátis</span>
            <span className="text-[10px] text-gray-500">Para todo o Brasil</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <CreditCard size={24} strokeWidth={1} className="text-gray-800" />
            <span className="text-xs font-bold uppercase tracking-wider">Até 10x Sem Juros</span>
            <span className="text-[10px] text-gray-500">No cartão de crédito</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <ShieldCheck size={24} strokeWidth={1} className="text-gray-800" />
            <span className="text-xs font-bold uppercase tracking-wider">Compra Segura</span>
            <span className="text-[10px] text-gray-500">Seus dados protegidos</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Clock size={24} strokeWidth={1} className="text-gray-800" />
            <span className="text-xs font-bold uppercase tracking-wider">Envio Rápido</span>
            <span className="text-[10px] text-gray-500">Entrega expressa</span>
          </div>
        </div>
      </div>

      {/* Split Collections */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
        <div className="relative group overflow-hidden cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop" 
            alt="Match of Senses" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl font-serif text-white mb-4 italic">Match of Senses</h2>
            <Link to="/shop?cat=match" className="text-white border-b border-white pb-1 text-sm uppercase tracking-widest hover:text-gold-500 hover:border-gold-500 transition-colors">
              Descobrir Coleção
            </Link>
          </div>
        </div>
        <div className="relative group overflow-hidden cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1585120040315-2241b774ad0f?q=80&w=1000&auto=format&fit=crop" 
            alt="Exclusif" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl font-serif text-white mb-4 italic">Exclusif</h2>
            <Link to="/shop?cat=exclusif" className="text-white border-b border-white pb-1 text-sm uppercase tracking-widest hover:text-gold-500 hover:border-gold-500 transition-colors">
              Descobrir Coleção
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-20 max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-medium mb-2">Lançamentos</h2>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Novas Fragrâncias</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                {product.stock < 5 && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    Últimas Unidades
                  </span>
                )}
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Adicionar à Sacola
                </button>
              </div>
              <div className="text-center">
                <Link to={`/product/${product.id}`} className="group-hover:text-gold-600 transition-colors">
                  <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                </Link>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{product.category}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium">R$ {product.price}</span>
                  <span className="text-xs text-gray-400 line-through">R$ {(product.price * 1.2).toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">10x de R$ {(product.price / 10).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight Section (Omnia IV style) */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={spotlightProduct.image} 
              alt={spotlightProduct.name} 
              className="w-full max-w-md mx-auto shadow-2xl shadow-gold-500/20"
            />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <span className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              Destaque do Mês
            </span>
            <h2 className="text-5xl md:text-6xl font-serif italic mb-6">
              {spotlightProduct.name}
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Uma obra-prima olfativa que transcende o tempo. 
              Notas profundas de {spotlightProduct.notes.join(', ')} criam uma aura de mistério e sedução.
            </p>
            <Link 
              to={`/shop`} 
              className="inline-block border border-white text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              Comprar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Gender Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[500px]">
        <div className="relative group flex items-center justify-center bg-gray-100">
          <div className="absolute inset-0">
             <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" 
              alt="Para Ele" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-serif text-white mb-4 drop-shadow-lg">Para Ele</h3>
            <Link to="/shop?cat=woody" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Ver Coleção
            </Link>
          </div>
        </div>
        <div className="relative group flex items-center justify-center bg-gray-100">
          <div className="absolute inset-0">
             <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" 
              alt="Para Ela" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-serif text-white mb-4 drop-shadow-lg">Para Ela</h3>
            <Link to="/shop?cat=floral" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Ver Coleção
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Video / Image Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1605618738608-410456722d25?q=80&w=2000&auto=format&fit=crop" 
            alt="Brand Atmosphere" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 group">
            <Play size={32} className="ml-2 group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">The Art of Perfumery</h2>
          <p className="text-lg max-w-2xl mx-auto font-light tracking-wide">
            Cada frasco conta uma história. Cada essência é uma viagem.
          </p>
        </div>
      </section>

      {/* Blog / In The Box */}
      <section className="py-24 max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-medium mb-2">In The Box</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Nosso Blog</p>
          </div>
          <Link to="/blog" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
            Ver Todos os Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/9] overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={`https://picsum.photos/seed/perfume${i}/800/600`} 
                  alt="Blog Post" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Lifestyle • 12 Out 2024
              </span>
              <h3 className="text-xl font-serif mb-3 group-hover:text-gold-600 transition-colors">
                A Arte de Escolher o Perfume Perfeito para Cada Ocasião
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                Descubra como as notas olfativas interagem com sua pele e o ambiente para criar uma assinatura única.
              </p>
              <span className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 pb-1 group-hover:border-black transition-colors">
                Ler Mais
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
