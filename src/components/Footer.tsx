import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-600 font-sans">
      {/* Newsletter Section - Black Bar */}
      <div className="bg-black text-white py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <span className="font-bold tracking-widest text-lg">NEWSLETTER</span>
             <span className="text-sm text-gray-400 hidden md:block">Inscreva-se para receber novidades e promoções.</span>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="text" 
              placeholder="Insira seu nome" 
              className="bg-white text-black px-4 py-2 text-sm w-full md:w-64 focus:outline-none"
            />
            <input 
              type="email" 
              placeholder="Insira seu e-mail" 
              className="bg-white text-black px-4 py-2 text-sm w-full md:w-64 focus:outline-none"
            />
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand/Logo Column */}
          <div className="space-y-6">
            <div className="border border-black p-4 inline-block">
              <h2 className="text-2xl font-serif font-bold text-black tracking-widest leading-none text-center">
                ARABIAN<br/>ESSENCE
              </h2>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-6">Institucional</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Nossas Lojas</a></li>
              <li><a href="/blog" className="hover:text-black transition-colors">Blog In The Box</a></li>
              <li><a href="/shipping" className="hover:text-black transition-colors">Formas de Entregas</a></li>
              <li><a href="/shipping" className="hover:text-black transition-colors">Condições para Frete Grátis</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-6">Ajuda</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Fale conosco</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Trocas e devoluções</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Site Seguro</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Termos de Garantia</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Aprovações de Pagamentos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Dicas de uso site novo</a></li>
            </ul>
          </div>

          {/* Termos de Uso */}
          <div>
             <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-6">Termos de uso</h3>
             <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Aviso de Cookies e Dados</a></li>
            </ul>
            <div className="mt-8">
               <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">Pagamento</h3>
               <div className="flex gap-2 text-gray-400">
                 <CreditCard size={24} />
                 <CreditCard size={24} />
                 <CreditCard size={24} />
                 <CreditCard size={24} />
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Arabian Essence. Todos os direitos reservados.
          </p>
          <p className="mt-2 md:mt-0">
            CNPJ: 00.000.000/0000-00 - Rua Exemplo, 123, Dubai - UAE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
