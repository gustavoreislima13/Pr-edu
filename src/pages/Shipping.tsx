import React from 'react';
import { Truck, Clock, ShieldCheck } from 'lucide-react';

const Shipping: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-black mb-8 text-center">Prazos e Frete Grátis</h1>
        
        <div className="space-y-12">
          {/* Free Shipping Policy */}
          <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Truck size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black mb-4">Política de Frete Grátis</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Oferecemos frete grátis para todo o Brasil em compras acima de um determinado valor. Aproveite para adquirir suas fragrâncias favoritas com mais comodidade.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Sul e Sudeste:</strong> Frete grátis para compras acima de R$ 299,00.</li>
                  <li><strong>Centro-Oeste:</strong> Frete grátis para compras acima de R$ 399,00.</li>
                  <li><strong>Norte e Nordeste:</strong> Frete grátis para compras acima de R$ 499,00.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Delivery Times */}
          <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Clock size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black mb-4">Prazos de Entrega</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nossos prazos de entrega variam de acordo com a sua localização e a modalidade de envio escolhida. O prazo começa a contar a partir da confirmação do pagamento.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-black mb-2">Sedex (Expresso)</h3>
                    <p className="text-sm text-gray-500">Capital: 1 a 3 dias úteis</p>
                    <p className="text-sm text-gray-500">Interior: 2 a 5 dias úteis</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-black mb-2">PAC (Econômico)</h3>
                    <p className="text-sm text-gray-500">Capital: 5 a 10 dias úteis</p>
                    <p className="text-sm text-gray-500">Interior: 7 a 15 dias úteis</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safe Delivery */}
          <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black mb-4">Entrega Segura</h2>
                <p className="text-gray-600 leading-relaxed">
                  Todas as nossas encomendas são enviadas com seguro e código de rastreamento. Você receberá atualizações sobre o status do seu pedido por e-mail e poderá acompanhar cada etapa da entrega. Garantimos que seus produtos chegarão em perfeito estado.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
