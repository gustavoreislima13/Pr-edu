import React, { createContext, useContext, useState, useEffect } from 'react';
import { PERFUMES, INITIAL_ORDERS, Perfume, Order } from '../data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

interface CartItem extends Perfume {
  quantity: number;
}

interface StoreContextType {
  user: User | null;
  login: (email: string, role: 'admin' | 'customer') => void;
  logout: () => void;
  products: Perfume[];
  cart: CartItem[];
  addToCart: (product: Perfume) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  expenses: number;
  addExpense: (amount: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products] = useState<Perfume[]>(PERFUMES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [expenses, setExpenses] = useState<number>(5000); // Initial mock expenses
  const [wishlist, setWishlist] = useState<string[]>([]);

  const login = (email: string, role: 'admin' | 'customer') => {
    setUser({
      id: 'usr-123',
      name: role === 'admin' ? 'Admin Sultão' : 'Convidado de Honra',
      email,
      role
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const addToCart = (product: Perfume) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addExpense = (amount: number) => {
    setExpenses(prev => prev + amount);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <StoreContext.Provider value={{
      user,
      login,
      logout,
      products,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      orders,
      updateOrderStatus,
      expenses,
      addExpense,
      wishlist,
      toggleWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
