import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowDownRight, BarChart3, Calendar, FileText, Check, Package
} from 'lucide-react';
import { format } from 'date-fns';

const entryTypes = [
  { id: 'revenue', name: 'Revenue', icon: ArrowUpRight, color: 'success' },
  { id: 'expense', name: 'Expense', icon: ArrowDownRight, color: 'destructive' },
  { id: 'investment', name: 'Investment', icon: BarChart3, color: 'warning' },
];

const categories = {
  revenue: ['Product Sale', 'Service Fee', 'Subscription', 'Consulting', 'Other Income'],
  expense: ['Inventory', 'Marketing', 'Operations', 'Salaries', 'Utilities', 'Rent', 'Other'],
  investment: ['Equipment', 'Marketing', 'Technology', 'Real Estate', 'Stocks', 'Other'],
};

const AddBusinessEntryPage: React.FC = () => {
  const [type, setType] = useState<'revenue' | 'expense' | 'investment'>('revenue');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [notes, setNotes] = useState('');
  const { addBusinessEntry, businessProfile } = useApp();
  const navigate = useNavigate();

  const currencySymbol = businessProfile?.currency === 'USD' ? '$' : 
                         businessProfile?.currency === 'EUR' ? '€' : '$';

  const handleSave = () => {
    if (category && amount) {
      addBusinessEntry({
        type,
        category,
        amount: parseFloat(amount),
        date: new Date(date),
        notes: notes || undefined,
      });
      navigate('/business/dashboard');
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'revenue': return 'success';
      case 'expense': return 'destructive';
      case 'investment': return 'warning';
    }
  };

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Add Entry</h1>
        <p className="text-muted-foreground">Record business transactions</p>
      </div>

      {/* Type Selection */}
      <div className="flex gap-2 mb-6">
        {entryTypes.map((entryType) => {
          const Icon = entryType.icon;
          const isSelected = type === entryType.id;
          return (
            <button
              key={entryType.id}
              onClick={() => { setType(entryType.id as any); setCategory(''); }}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? `border-${entryType.color} bg-${entryType.color}/5`
                  : 'border-border bg-card hover:border-muted-foreground/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isSelected ? `bg-${entryType.color}/10` : 'bg-muted'
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? `text-${entryType.color}` : 'text-muted-foreground'}`} />
              </div>
              <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                {entryType.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories[type].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          ))}
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
            className="flex w-full rounded-xl border-2 border-input bg-card px-4 py-3 pl-12 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition-all min-h-[100px] resize-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <Button 
        size="lg" 
        className={`w-full ${
          type === 'revenue' ? 'bg-success hover:bg-success/90' :
          type === 'expense' ? 'bg-destructive hover:bg-destructive/90' :
          'bg-warning hover:bg-warning/90'
        }`}
        onClick={handleSave}
        disabled={!category || !amount}
      >
        Save {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    </div>
  );
};

export default AddBusinessEntryPage;
