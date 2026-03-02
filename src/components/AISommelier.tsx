import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getGeminiRecommendation } from '../lib/gemini';
import { useStore } from '../context/StoreContext';

const AISommelier: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([
    { text: "Bem-vindo à Arabian Essence. Sou seu Sommelier pessoal. Diga-me, quais aromas cativam sua alma? Você prefere o calor do Oud, o frescor dos Cítricos ou o mistério do Âmbar?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { products } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const recommendation = await getGeminiRecommendation(userMessage, products);
      setMessages(prev => [...prev, { text: recommendation || "Peço desculpas, não consegui encontrar uma recomendação.", sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Meus sentidos estão momentaneamente sobrecarregados. Por favor, tente novamente.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-gold-600 text-black p-4 rounded-full shadow-lg shadow-gold-500/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-full max-w-md bg-black-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900 to-black p-4 flex justify-between items-center border-b border-gold-500/20">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-gold-500" size={20} />
                <h3 className="text-gold-500 font-serif font-medium">Sommelier IA</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/95">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-900/50 text-white rounded-br-none border border-emerald-700/30'
                        : 'bg-white/5 text-gray-200 rounded-bl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/10 flex space-x-1">
                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Descreva o aroma que deseja..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gold-600 hover:bg-gold-500 text-black p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISommelier;
