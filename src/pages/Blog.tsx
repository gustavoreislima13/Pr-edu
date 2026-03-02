import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "A Arte de Escolher o Perfume Perfeito",
    excerpt: "Descubra como identificar as notas que mais combinam com sua personalidade e ocasião.",
    date: "28 Fev 2024",
    author: "Isabella Rossi",
    image: "https://images.unsplash.com/photo-1594035910387-406691aa9316?q=80&w=1000&auto=format&fit=crop",
    category: "Dicas"
  },
  {
    id: 2,
    title: "Oud: O Ouro Líquido da Perfumaria",
    excerpt: "Conheça a história e o processo de extração de um dos ingredientes mais valiosos do mundo.",
    date: "25 Fev 2024",
    author: "Ahmed Al-Fayed",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop",
    category: "Ingredientes"
  },
  {
    id: 3,
    title: "Tendências de Fragrâncias para 2024",
    excerpt: "O que esperar do mundo da alta perfumaria este ano? Confira as principais apostas.",
    date: "20 Fev 2024",
    author: "Sofia Costa",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    category: "Tendências"
  },
  {
    id: 4,
    title: "Como Fazer seu Perfume Durar Mais",
    excerpt: "Truques simples e eficazes para aumentar a fixação da sua fragrância favorita.",
    date: "15 Fev 2024",
    author: "Isabella Rossi",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    category: "Dicas"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3 block">
            In The Box
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-6">
            Blog Arabian Essence
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Mergulhe no universo da alta perfumaria com artigos exclusivos, dicas de especialistas e histórias fascinantes.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                  {post.category}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-serif text-black mb-3 group-hover:text-gold-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-black hover:text-gold-600 transition-colors mt-auto"
                >
                  Ler Artigo <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
