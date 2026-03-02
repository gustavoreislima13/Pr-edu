import { LucideIcon } from 'lucide-react';

export interface Perfume {
  id: string;
  name: string;
  price: number;
  description: string;
  notes: string[];
  image: string;
  category: 'Woody' | 'Floral' | 'Spicy' | 'Fresh' | 'Oriental';
  stock: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  total: number;
  items: { perfumeId: string; quantity: number }[];
}

export const PERFUMES: Perfume[] = [
  {
    id: '1',
    name: 'Oud Royal',
    price: 1200,
    description: 'Uma mistura majestosa de oud cambojano puro e rosa, digna da realeza.',
    notes: ['Oud', 'Rosa', 'Âmbar'],
    image: 'https://images.unsplash.com/photo-1594035910387-406691aa9316?q=80&w=1000&auto=format&fit=crop',
    category: 'Woody',
    stock: 15
  },
  {
    id: '2',
    name: "Sultan's Gold",
    price: 950,
    description: 'Açafrão rico e âmbar dourado criam uma aura de poder absoluto.',
    notes: ['Açafrão', 'Âmbar', 'Almíscar'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    category: 'Oriental',
    stock: 8
  },
  {
    id: '3',
    name: 'Desert Rose',
    price: 450,
    description: 'Um perfume floral delicado que floresce no calor da noite do deserto.',
    notes: ['Rosa', 'Baunilha', 'Sândalo'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    category: 'Floral',
    stock: 42
  },
  {
    id: '4',
    name: 'Midnight Amber',
    price: 680,
    description: 'Escuro, misterioso e inebriante. Para aqueles que dominam a noite.',
    notes: ['Âmbar', 'Patchouli', 'Pimenta Preta'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
    category: 'Spicy',
    stock: 20
  },
  {
    id: '5',
    name: 'Emerald Vetiver',
    price: 550,
    description: 'Fresco e terroso, como um oásis nas dunas.',
    notes: ['Vetiver', 'Bergamota', 'Cedro'],
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop',
    category: 'Fresh',
    stock: 30
  },
  {
    id: '6',
    name: 'Black Musk',
    price: 890,
    description: 'Intenso e animalesco, um perfume de elegância primal.',
    notes: ['Almíscar', 'Couro', 'Tabaco'],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop',
    category: 'Woody',
    stock: 12
  },
  {
    id: '7',
    name: 'Golden Saffron',
    price: 1100,
    description: 'A especiaria mais cara do mundo, capturada em um frasco.',
    notes: ['Açafrão', 'Mel', 'Oud'],
    image: 'https://images.unsplash.com/photo-1512777576255-b70959efcf6e?q=80&w=1000&auto=format&fit=crop',
    category: 'Oriental',
    stock: 5
  },
  {
    id: '8',
    name: 'Jasmine Nights',
    price: 380,
    description: 'Florais brancos inebriantes sob o luar.',
    notes: ['Jasmim', 'Tuberosa', 'Ylang-Ylang'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    category: 'Floral',
    stock: 50
  },
  {
    id: '9',
    name: 'Spiced Cardamom',
    price: 420,
    description: 'Quente e convidativo, com um toque de especiarias exóticas.',
    notes: ['Cardamomo', 'Canela', 'Baunilha'],
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a120?q=80&w=1000&auto=format&fit=crop',
    category: 'Spicy',
    stock: 25
  },
  {
    id: '10',
    name: 'Cedar Mist',
    price: 480,
    description: 'Ar fresco da montanha e antigas florestas de cedro.',
    notes: ['Cedro', 'Pinho', 'Limão'],
    image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=1000&auto=format&fit=crop',
    category: 'Fresh',
    stock: 35
  },
  {
    id: '11',
    name: 'Royal Incense',
    price: 750,
    description: 'Fumaça sagrada subindo de incensários dourados.',
    notes: ['Incenso', 'Mirra', 'Olíbano'],
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop',
    category: 'Oriental',
    stock: 18
  },
  {
    id: '12',
    name: 'Velvet Rose',
    price: 520,
    description: 'Pétalas de rosa suaves e atalcadas em uma cama de veludo.',
    notes: ['Rosa', 'Violeta', 'Almíscar'],
    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop',
    category: 'Floral',
    stock: 40
  },
  {
    id: '13',
    name: 'Smoked Leather',
    price: 820,
    description: 'Robusto e refinado, o perfume de uma alma viajada.',
    notes: ['Couro', 'Fumaça', 'Bétula'],
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1000&auto=format&fit=crop',
    category: 'Woody',
    stock: 14
  },
  {
    id: '14',
    name: 'Citrus Gold',
    price: 350,
    description: 'Brilhante e cintilante, como a luz do sol no ouro.',
    notes: ['Bergamota', 'Laranja', 'Neroli'],
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop',
    category: 'Fresh',
    stock: 60
  },
  {
    id: '15',
    name: 'Amber Wood',
    price: 600,
    description: 'Resina de âmbar profunda derretendo em madeira quente.',
    notes: ['Âmbar', 'Sândalo', 'Baunilha'],
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1000&auto=format&fit=crop',
    category: 'Woody',
    stock: 22
  },
  {
    id: '16',
    name: 'Mystic Iris',
    price: 580,
    description: 'Elegante e atalcado, um perfume de luxo silencioso.',
    notes: ['Íris', 'Raiz de Orris', 'Almíscar'],
    image: 'https://images.unsplash.com/photo-1594035910387-406691aa9316?q=80&w=1000&auto=format&fit=crop',
    category: 'Floral',
    stock: 28
  },
  {
    id: '17',
    name: 'Spicy Tobacco',
    price: 720,
    description: 'Folhas de tabaco doce temperadas com cravo e canela.',
    notes: ['Tabaco', 'Cravo', 'Canela'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    category: 'Spicy',
    stock: 16
  },
  {
    id: '18',
    name: 'Ocean Breeze',
    price: 320,
    description: 'O cheiro do mar encontrando a costa do deserto.',
    notes: ['Sal Marinho', 'Sálvia', 'Madeira à Deriva'],
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop',
    category: 'Fresh',
    stock: 45
  },
  {
    id: '19',
    name: 'Dark Chocolate Oud',
    price: 980,
    description: 'Um oud gourmand com notas ricas de chocolate amargo.',
    notes: ['Oud', 'Chocolate Amargo', 'Patchouli'],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop',
    category: 'Oriental',
    stock: 10
  },
  {
    id: '20',
    name: 'White Santal',
    price: 650,
    description: 'Sândalo cremoso com um toque de pimenta branca.',
    notes: ['Sândalo', 'Pimenta Branca', 'Almíscar'],
    image: 'https://images.unsplash.com/photo-1512777576255-b70959efcf6e?q=80&w=1000&auto=format&fit=crop',
    category: 'Woody',
    stock: 24
  },
  {
    id: '21',
    name: 'Imperial Rose',
    price: 850,
    description: 'Uma rosa profunda e escura, digna de um imperador.',
    notes: ['Rosa', 'Oud', 'Açafrão'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    category: 'Floral',
    stock: 13
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Ahmed Al-Fayed',
    date: '2023-10-25',
    status: 'Delivered',
    total: 2150,
    items: [{ perfumeId: '1', quantity: 1 }, { perfumeId: '2', quantity: 1 }]
  },
  {
    id: 'ORD-002',
    customerName: 'Layla Hassan',
    date: '2023-10-26',
    status: 'Shipped',
    total: 450,
    items: [{ perfumeId: '3', quantity: 1 }]
  },
  {
    id: 'ORD-003',
    customerName: 'Omar Sharif',
    date: '2023-10-27',
    status: 'Processing',
    total: 1230,
    items: [{ perfumeId: '4', quantity: 1 }, { perfumeId: '5', quantity: 1 }]
  },
  {
    id: 'ORD-004',
    customerName: 'Fatima Zara',
    date: '2023-10-28',
    status: 'Pending',
    total: 1100,
    items: [{ perfumeId: '7', quantity: 1 }]
  },
  {
    id: 'ORD-005',
    customerName: 'Khalid Ben',
    date: '2023-10-28',
    status: 'Pending',
    total: 380,
    items: [{ perfumeId: '8', quantity: 1 }]
  }
];
