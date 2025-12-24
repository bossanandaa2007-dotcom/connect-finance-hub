import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, Edit2, Check, X,
  Home, Film, ShoppingCart, Cookie, Heart, GraduationCap, Scissors,
  ShoppingBag, Car, Flower2, Shield, Building, MoreHorizontal
} from 'lucide-react';

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
};

const BudgetPage: React.FC = () => {
  const { budget, setBudget, transactions, userProfile } = useApp();
  const [editingTotal, setEditingTotal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const currencySymbol = userProfile?.currency === 'USD' ? '$' : userProfile?.currency === 'EUR' ? '€' : '$';

  const categories = ['Groceries', 'Entertainment', 'Transportation', 'Home Bills', 'Shopping', 'Health'];

  const getCategorySpent = (category: string) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'bg-destructive';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-success';
  };

  const handleSaveTotal = () => {
    setBudget({ ...budget, total: parseFloat(tempValue) || budget.total });
    setEditingTotal(false);
  };

  const handleSaveCategory = (category: string) => {
    setBudget({
      ...budget,
      categories: { ...budget.categories, [category]: parseFloat(tempValue) || 0 }
    });
    setEditingCategory(null);
  };

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Budget</h1>
        <p className="text-muted-foreground">Manage your monthly spending limits</p>
      </div>

      {/* Total Budget Card */}
      <div className="p-5 rounded-2xl bg-primary text-primary-foreground shadow-elevated mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 opacity-80" />
            <span className="text-sm opacity-90">Monthly Budget</span>
          </div>
          {!editingTotal ? (
            <button 
              onClick={() => { setEditingTotal(true); setTempValue(budget.total.toString()); }}
              className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSaveTotal}
                className="p-2 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30"
              >
                <Check className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setEditingTotal(false)}
                className="p-2 rounded-lg hover:bg-primary-foreground/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {editingTotal ? (
          <Input
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="text-2xl font-bold bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
            autoFocus
          />
        ) : (
          <div className="text-3xl font-bold">{currencySymbol}{budget.total.toLocaleString()}</div>
        )}

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Spent: {currencySymbol}{totalSpent.toLocaleString()}</span>
            <span>Remaining: {currencySymbol}{(budget.total - totalSpent).toLocaleString()}</span>
          </div>
          <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${totalSpent > budget.total ? 'bg-destructive' : 'bg-primary-foreground'}`}
              style={{ width: `${Math.min((totalSpent / budget.total) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Budgets */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Category Limits</h2>
        <div className="space-y-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || MoreHorizontal;
            const limit = budget.categories[category] || 0;
            const spent = getCategorySpent(category);
            const percentage = limit > 0 ? (spent / limit) * 100 : 0;
            const statusColor = getStatusColor(spent, limit);

            return (
              <div key={category} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {currencySymbol}{spent.toLocaleString()} of {currencySymbol}{limit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {editingCategory === category ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-24 h-9 text-sm"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleSaveCategory(category)}
                        className="p-2 rounded-lg bg-primary text-primary-foreground"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingCategory(null)}
                        className="p-2 rounded-lg bg-muted"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setEditingCategory(category); setTempValue(limit.toString()); }}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${statusColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                {percentage >= 80 && (
                  <p className={`text-xs mt-2 ${percentage >= 100 ? 'text-destructive' : 'text-warning'}`}>
                    {percentage >= 100 ? '⚠️ Budget exceeded!' : '⚠️ Near budget limit'}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
