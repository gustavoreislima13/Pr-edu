import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiRecommendation = async (userMessage: string, products: any[]) => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning mock response.");
    return "Como Sommelier de IA, recomendo explorar nossa coleção Amadeirada. Talvez o 'Oud Royal' seja do seu agrado.";
  }

  try {
    const productContext = products.map(p => `${p.name} (${p.category}): ${p.description} Notas: ${p.notes.join(', ')} Preço: R$ ${p.price}`).join('\n');
    
    const prompt = `
      Você é um Sommelier de Perfumes especialista para uma marca de luxo árabe chamada "Arabian Essence".
      
      Mensagem do Usuário: "${userMessage}"
      
      Produtos Disponíveis:
      ${productContext}
      
      Sua tarefa é agir como um consultor de luxo sofisticado.
      Se o usuário pedir uma recomendação, sugira 1-2 perfumes específicos da lista que combinem com o gosto dele.
      Se o usuário fizer uma pergunta sobre perfumes, história da marca ou ingredientes, responda com autoridade e elegância.
      Mantenha o tom sofisticado, acolhedor e luxuoso. Responda sempre em Português do Brasil.
      Não mencione preços a menos que perguntado especificamente. Foque nas notas olfativas e nas sensações.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou meditando sobre a essência perfeita para você. Por favor, tente novamente em um momento.";
  }
};

export const getBusinessInsights = async (orders: any[], products: any[], expenses: number) => {
  if (!ai) {
    return "As vendas estão estáveis. Considere promover a coleção 'Desert Rose' para aumentar o engajamento.";
  }

  try {
    // Calculate basic stats to feed the AI
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalRevenue / totalOrders || 0;
    
    // Find best sellers
    const productSales: Record<string, number> = {};
    orders.forEach(order => {
      order.items.forEach((item: any) => {
        productSales[item.perfumeId] = (productSales[item.perfumeId] || 0) + item.quantity;
      });
    });
    
    const context = `
      Receita Total: R$${totalRevenue}
      Despesas Totais: R$${expenses}
      Lucro Líquido: R$${totalRevenue - expenses}
      Total de Pedidos: ${totalOrders}
      Ticket Médio: R$${averageOrderValue.toFixed(2)}
      
      Vendas por Produto:
      ${Object.entries(productSales).map(([id, count]) => {
        const product = products.find(p => p.id === id);
        return `${product?.name || id}: ${count}`;
      }).join('\n')}
    `;

    const prompt = `
      Você é um consultor de negócios de luxo para a "Arabian Essence".
      Analise os seguintes dados de vendas e forneça 3 insights estratégicos e acionáveis para aumentar a lucratividade e o prestígio da marca.
      
      Dados:
      ${context}
      
      Formato: Bullet points. Tom profissional e estratégico. Responda em Português.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Não foi possível gerar insights neste momento.";
  }
};
