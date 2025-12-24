import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserMode = 'personal' | 'business' | null;
export type TransactionType = 'income' | 'expense';
export type BusinessEntryType = 'revenue' | 'expense' | 'investment';

export interface UserProfile {
  fullName: string;
  profilePicture?: string;
  currency: string;
  occupation: string;
  phone: string;
  email: string;
}

export interface BusinessProfile {
  ownerName: string;
  businessName: string;
  businessType: 'product' | 'service' | 'hybrid';
  currency: string;
  startDate: string;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: Date;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  cost: number;
  sellingPrice: number;
}

export interface BusinessEntry {
  id: string;
  type: BusinessEntryType;
  productOrService?: string;
  category: string;
  amount: number;
  date: Date;
  notes?: string;
}

export interface Budget {
  total: number;
  categories: { [key: string]: number };
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  businessProfile: BusinessProfile | null;
  setBusinessProfile: (profile: BusinessProfile | null) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  budget: Budget;
  setBudget: (budget: Budget) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  businessEntries: BusinessEntry[];
  addBusinessEntry: (entry: Omit<BusinessEntry, 'id'>) => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Home Bills', icon: 'Home', color: 'bg-blue-500' },
  { id: '2', name: 'Entertainment', icon: 'Film', color: 'bg-purple-500' },
  { id: '3', name: 'Groceries', icon: 'ShoppingCart', color: 'bg-green-500' },
  { id: '4', name: 'Snacks', icon: 'Cookie', color: 'bg-orange-500' },
  { id: '5', name: 'Health', icon: 'Heart', color: 'bg-red-500' },
  { id: '6', name: 'Education', icon: 'GraduationCap', color: 'bg-indigo-500' },
  { id: '7', name: 'Grooming', icon: 'Scissors', color: 'bg-pink-500' },
  { id: '8', name: 'Shopping', icon: 'ShoppingBag', color: 'bg-yellow-500' },
  { id: '9', name: 'Transportation', icon: 'Car', color: 'bg-cyan-500' },
  { id: '10', name: 'Gardening', icon: 'Flower2', color: 'bg-lime-500' },
  { id: '11', name: 'Insurance', icon: 'Shield', color: 'bg-slate-500' },
  { id: '12', name: 'Housing', icon: 'Building', color: 'bg-amber-500' },
  { id: '13', name: 'Miscellaneous', icon: 'MoreHorizontal', color: 'bg-gray-500' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMode, setUserMode] = useState<UserMode>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'expense', category: 'Groceries', amount: 150, date: new Date(), notes: 'Weekly groceries' },
    { id: '2', type: 'income', category: 'Salary', amount: 5000, date: new Date(), notes: 'Monthly salary' },
    { id: '3', type: 'expense', category: 'Entertainment', amount: 50, date: new Date(), notes: 'Movie night' },
  ]);
  const [budget, setBudget] = useState<Budget>({
    total: 3000,
    categories: {
      'Groceries': 500,
      'Entertainment': 200,
      'Transportation': 300,
    },
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [businessEntries, setBusinessEntries] = useState<BusinessEntry[]>([]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices((prev) => [...prev, newService]);
  };

  const addBusinessEntry = (entry: Omit<BusinessEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setBusinessEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userMode,
        setUserMode,
        userProfile,
        setUserProfile,
        businessProfile,
        setBusinessProfile,
        transactions,
        addTransaction,
        budget,
        setBudget,
        products,
        addProduct,
        services,
        addService,
        businessEntries,
        addBusinessEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export { defaultCategories };
