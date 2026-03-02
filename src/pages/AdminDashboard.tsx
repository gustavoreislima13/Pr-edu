import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { getBusinessInsights } from '../lib/gemini';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, DollarSign, Package, Users, AlertCircle, CheckCircle, 
  Clock, Truck, RefreshCw 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { orders, products, expenses, addExpense, updateOrderStatus } = useStore();
  const [insights, setInsights] = useState<string>('Analisando dados...');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [newExpense, setNewExpense] = useState('');

  // Calculate Stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const netProfit = totalRevenue - expenses;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  // Prepare Chart Data
  const salesData = orders.map(order => ({
    name: order.date,
    sales: order.total
  }));

  const productSales: Record<string, number> = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const product = products.find(p => p.id === item.perfumeId);
      if (product) {
        productSales[product.name] = (productSales[product.name] || 0) + item.quantity;
      }
    });
  });

  const pieData = Object.entries(productSales).map(([name, value]) => ({ name, value }));
  const COLORS = ['#064e3b', '#d4af37', '#b8962e', '#0a0a0a', '#333'];

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const result = await getBusinessInsights(orders, products, expenses);
      setInsights(result);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [orders, products, expenses]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense) {
      addExpense(parseFloat(newExpense));
      setNewExpense('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-black mb-8">Painel Executivo</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={DollarSign} title="Receita Total" value={`R$ ${totalRevenue.toLocaleString()}`} color="text-emerald-600" />
          <StatCard icon={TrendingUp} title="Lucro Líquido" value={`R$ ${netProfit.toLocaleString()}`} color="text-gold-600" />
          <StatCard icon={Package} title="Total de Pedidos" value={totalOrders} color="text-blue-600" />
          <StatCard icon={AlertCircle} title="Pedidos Pendentes" value={pendingOrders} color="text-red-600" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-serif text-black mb-6">Desempenho de Vendas</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#eee', color: '#000' }}
                    itemStyle={{ color: '#d4af37' }}
                  />
                  <Bar dataKey="sales" fill="#d4af37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <RefreshCw size={100} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-serif text-emerald-700 mb-4 flex items-center">
              <SparklesIcon className="mr-2" /> Inteligência de Negócios IA
            </h3>
            <div className="prose prose-sm max-w-none">
              {loadingInsights ? (
                <div className="flex items-center space-x-2 text-gray-500 animate-pulse">
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Analisando tendências de mercado...</span>
                </div>
              ) : (
                <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                  {insights}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders & Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-serif text-black mb-6">Pedidos Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-sm">
                    <th className="pb-3">ID do Pedido</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Ação</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-gold-600 font-mono">{order.id}</td>
                      <td className="py-4 text-gray-800">{order.customerName}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status === 'Delivered' ? 'Entregue' : 
                           order.status === 'Shipped' ? 'Enviado' : 
                           order.status === 'Processing' ? 'Processando' : 'Pendente'}
                        </span>
                      </td>
                      <td className="py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 focus:border-gold-500 outline-none"
                        >
                          <option value="Pending">Pendente</option>
                          <option value="Processing">Processando</option>
                          <option value="Shipped">Enviado</option>
                          <option value="Delivered">Entregue</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Management */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-serif text-black mb-6">Visão Financeira</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Despesas Totais</p>
                <p className="text-2xl font-mono text-red-500">R$ {expenses.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Crescimento Projetado</p>
                <p className="text-2xl font-mono text-emerald-500">+12.5%</p>
              </div>
            </div>
            
            <form onSubmit={handleAddExpense} className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2">Adicionar Despesa Diversa</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <input 
                    type="number" 
                    value={newExpense}
                    onChange={(e) => setNewExpense(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-black focus:border-gold-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200"
              >
                Registrar
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, title: string, value: string | number, color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-gold-500/30 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full bg-gray-50 ${color}`}>
        <Icon size={24} />
      </div>
      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">+2.5%</span>
    </div>
    <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">{title}</h4>
    <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
  </div>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default AdminDashboard;
