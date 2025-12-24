import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowDownRight, Calendar, FileText, Check,
  Home, Film, ShoppingCart, Cookie, Heart, GraduationCap, Scissors,
  ShoppingBag, Car, Flower2, Shield, Building, MoreHorizontal, TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';

const categories = [
  { name: 'Home Bills', icon: Home },
  { name: 'Entertainment', icon: Film },
  { name: 'Groceries', icon: ShoppingCart },
  { name: 'Snacks', icon: Cookie },
  { name: 'Health', icon: Heart },
  { name: 'Education', icon: GraduationCap },
  { name: 'Grooming', icon: Scissors },
  { name: 'Shopping', icon: ShoppingBag },
  { name: 'Transportation', icon: Car },
  { name: 'Gardening', icon: Flower2 },
  { name: 'Insurance', icon: Shield },
  { name: 'Housing', icon: Building },
  { name: 'Salary', icon: TrendingUp },
  { name: 'Miscellaneous', icon: MoreHorizontal },
];

const AddTransactionPage: React.FC = () => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [notes, setNotes] = useState('');
  const { addTransaction, userProfile } = useApp();
  const navigate = useNavigate();

  const currencySymbol = userProfile?.currency === 'USD' ? '$' : userProfile?.currency === 'EUR' ? '€' : '$';

  const handleSave = () => {
    if (category && amount) {
      addTransaction({
        type,
        category,
        amount: parseFloat(amount),
        date: new Date(date),
        notes: notes || undefined,
      });
      navigate('/personal/home');
    }
  };

  const filteredCategories = type === 'income' 
    ? categories.filter(c => ['Salary', 'Miscellaneous'].includes(c.name))
    : categories.filter(c => c.name !== 'Salary');

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Add Transaction</h1>
        <p className="text-muted-foreground">Record your income or expense</p>
      </div>

      {/* Type Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setType('expense')}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
            type === 'expense'
              ? 'border-destructive bg-destructive/5 text-destructive'
              : 'border-border bg-card text-muted-foreground hover:border-destructive/50'
          }`}
        >
          <ArrowDownRight className="w-5 h-5" />
          <span className="font-medium">Expense</span>
        </button>
        <button
          onClick={() => setType('income')}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
            type === 'income'
              ? 'border-success bg-success/5 text-success'
              : 'border-border bg-card text-muted-foreground hover:border-success/50'
          }`}
        >
          <ArrowUpRight className="w-5 h-5" />
          <span className="font-medium">Income</span>
        </button>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
        <div className="grid grid-cols-4 gap-3">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center line-clamp-1">
                  {cat.name.split(' ')[0]}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-primary absolute top-2 right-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-muted-foreground">
            {currencySymbol}
          </span>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 text-2xl font-bold h-16"
          />
        </div>
      </div>

      {/* Date Input */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-12"
          />
        </div>
      </div>

      {/* Notes Input */}
      <div className="mb-8">
        <label className="text-sm font-medium text-foreground mb-3 block">Notes (optional)</label>
        <div className="relative">
          <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <textarea
            placeholder="Add a note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex w-full rounded-xl border-2 border-input bg-card px-4 py-3 pl-12 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all min-h-[100px] resize-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <Button 
        size="lg" 
        className="w-full"
        onClick={handleSave}
        disabled={!category || !amount}
        variant={type === 'income' ? 'income' : 'expense'}
      >
        Save {type === 'income' ? 'Income' : 'Expense'}
      </Button>
    </div>
  );
};

export default AddTransactionPage;
