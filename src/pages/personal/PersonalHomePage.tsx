import React from 'react';
import { useApp, defaultCategories } from '@/contexts/AppContext';
import { 
  Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Home, Film, ShoppingCart, Cookie, Heart, GraduationCap, Scissors,
  ShoppingBag, Car, Flower2, Shield, Building, MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';

const iconMap: { [key: string]: any } = {
  Home, Film, ShoppingCart, Cookie, Heart, GraduationCap, Scissors,
  ShoppingBag, Car, Flower2, Shield, Building, MoreHorizontal
};

const categoryColors: { [key: string]: string } = {
  'Home Bills': 'bg-blue-500',
  'Entertainment': 'bg-purple-500',
  'Groceries': 'bg-success',
  'Snacks': 'bg-secondary',
  'Health': 'bg-destructive',
  'Education': 'bg-indigo-500',
  'Grooming': 'bg-pink-500',
  'Shopping': 'bg-warning',
  'Transportation': 'bg-cyan-500',
  'Gardening': 'bg-lime-500',
  'Insurance': 'bg-slate-500',
  'Housing': 'bg-amber-500',
  'Miscellaneous': 'bg-gray-500',
  'Salary': 'bg-success',
};

const categoryIcons: { [key: string]: any } = {
  'Home Bills': Home,
  'Entertainment': Film,
  'Groceries': ShoppingCart,
  'Snacks': Cookie,
  'Health': Heart,
  'Education': GraduationCap,
  'Grooming': Scissors,
  'Shopping': ShoppingBag,
  'Transportation': Car,
  'Gardening': Flower2,
  'Insurance': Shield,
  'Housing': Building,
  'Miscellaneous': MoreHorizontal,
  'Salary': TrendingUp,
};

const PersonalHomePage: React.FC = () => {
  const { transactions, userProfile } = useApp();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const currency = userProfile?.currency || 'USD';
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$';

  const categories = [
    'Home Bills', 'Entertainment', 'Groceries', 'Snacks', 'Health', 'Education',
    'Grooming', 'Shopping', 'Transportation', 'Gardening', 'Insurance', 'Housing', 'Miscellaneous'
  ];

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Hello, {userProfile?.fullName?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-muted-foreground">Here's your financial overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Balance Card */}
        <div className="p-5 rounded-2xl bg-primary text-primary-foreground shadow-elevated">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-90">Total Balance</span>
            <Wallet className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold">
            {currencySymbol}{balance.toLocaleString()}
          </div>
          <div className="text-xs opacity-75 mt-1">{currency}</div>
        </div>

        {/* Income & Expense Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Income */}
          <div className="p-4 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {currencySymbol}{totalIncome.toLocaleString()}
            </div>
          </div>

          {/* Expenses */}
          <div className="p-4 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Expenses</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {currencySymbol}{totalExpenses.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 8).map((category) => {
            const Icon = categoryIcons[category] || MoreHorizontal;
            const colorClass = categoryColors[category] || 'bg-gray-500';
            return (
              <button
                key={category}
                className="flex flex-col items-center p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xs text-muted-foreground text-center line-clamp-1">
                  {category.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
        <button className="w-full mt-3 py-2 text-sm text-primary font-medium hover:underline">
          View all categories →
        </button>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <button className="text-sm text-primary font-medium">See all</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => {
            const Icon = categoryIcons[transaction.category] || MoreHorizontal;
            const colorClass = categoryColors[transaction.category] || 'bg-gray-500';
            const isExpense = transaction.type === 'expense';

            return (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{transaction.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(transaction.date), 'MMM d, h:mm a')}
                  </p>
                </div>
                <div className={`text-right ${isExpense ? 'text-destructive' : 'text-success'}`}>
                  <span className="font-semibold">
                    {isExpense ? '-' : '+'}{currencySymbol}{transaction.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonalHomePage;
