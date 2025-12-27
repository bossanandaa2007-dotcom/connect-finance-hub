import React, { createContext, useContext, useState, ReactNode } from 'react';

/* ============================
   GLOBAL TYPES
============================ */

export type UserMode = 'personal' | 'business' | null;
export type TransactionType = 'income' | 'expense';
export type BusinessEntryType = 'revenue' | 'expense' | 'investment';

/* ============================
   PERSONAL PROFILE
============================ */

export interface UserProfile {
  fullName: string;
  profilePicture?: string;
  currency: string;
  occupation: string;
  phone: string;
  email: string;
}

/* ============================
   BUSINESS PROFILE
============================ */

export interface BusinessProfile {
  ownerName: string;
  businessName: string;
  industries: string[];
  currency: string;
  startDate?: string;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
}

/* ============================
   SHARED ENTITIES
============================ */

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

/* ============================
   BUSINESS OBJECTS (SETUP)
============================ */

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

/* ============================
   EXPENSE DEFINITIONS (NEW)
============================ */

export type ExpenseDefinitionType = 'salary' | 'petty';

export interface ExpenseDefinition {
  id: string;
  name: string;
  expenseType: ExpenseDefinitionType;
  defaultAmount?: number;
}

/* ============================
   BUSINESS HISTORY (STRICT)
============================ */

export interface BusinessEntry {
  id: string;
  type: BusinessEntryType;        // revenue | expense | investment
  refId?: string;                // productId / serviceId / expenseDefId
  refType?: 'product' | 'service' | 'salary' | 'petty';
  refName?: string;
  amount: number;
  date: Date;
  notes?: string;
}

/* ============================
   BUDGET
============================ */

export interface Budget {
  total: number;
  categories: Record<string, number>;
}

/* ============================
   CONTEXT SHAPE
============================ */

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;

  userMode: UserMode;
  setUserMode: (m: UserMode) => void;

  userProfile: UserProfile | null;
  setUserProfile: (p: UserProfile | null) => void;

  businessProfile: BusinessProfile | null;
  setBusinessProfile: (p: BusinessProfile | null) => void;

  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;

  budget: Budget;
  setBudget: (b: Budget) => void;

  products: Product[];
  addProduct: (p: Omit<Product, 'id'>) => void;

  services: Service[];
  addService: (s: Omit<Service, 'id'>) => void;

  expenseDefinitions: ExpenseDefinition[];
  addExpenseDefinition: (e: Omit<ExpenseDefinition, 'id'>) => void;

  businessEntries: BusinessEntry[];
  addBusinessEntry: (e: Omit<BusinessEntry, 'id'>) => void;
}

/* ============================
   CONTEXT
============================ */

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMode, setUserMode] = useState<UserMode>(null);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfile | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget>({ total: 0, categories: {} });

  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [expenseDefinitions, setExpenseDefinitions] =
    useState<ExpenseDefinition[]>([]);

  const [businessEntries, setBusinessEntries] = useState<BusinessEntry[]>([]);

  /* ============================
     MUTATORS
  ============================ */

  const addTransaction = (t: Omit<Transaction, 'id'>) =>
    setTransactions((p) => [{ ...t, id: Date.now().toString() }, ...p]);

  const addProduct = (p: Omit<Product, 'id'>) =>
    setProducts((x) => [...x, { ...p, id: Date.now().toString() }]);

  const addService = (s: Omit<Service, 'id'>) =>
    setServices((x) => [...x, { ...s, id: Date.now().toString() }]);

  const addExpenseDefinition = (e: Omit<ExpenseDefinition, 'id'>) =>
    setExpenseDefinitions((x) => [...x, { ...e, id: Date.now().toString() }]);

  /**
   * THE ONLY PLACE MONEY MOVES (HISTORY)
   */
  const addBusinessEntry = (e: Omit<BusinessEntry, 'id'>) =>
    setBusinessEntries((x) => [
      { ...e, id: Date.now().toString() },
      ...x,
    ]);

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
        expenseDefinitions,
        addExpenseDefinition,
        businessEntries,
        addBusinessEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
