import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Wrench,
  ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';
import { format } from 'date-fns';

const BusinessDashboardPage: React.FC = () => {
  const { businessProfile, businessEntries, products, services } = useApp();

  const currencySymbol = businessProfile?.currency === 'USD' ? '$' : 
                         businessProfile?.currency === 'EUR' ? '€' : 
                         businessProfile?.currency === 'GBP' ? '£' : '$';

  const totalRevenue = businessEntries
    .filter(e => e.type === 'revenue')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = businessEntries
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalInvestments = businessEntries
    .filter(e => e.type === 'investment')
    .reduce((sum, e) => sum + e.amount, 0);

  const netProfit = totalRevenue - totalExpenses;

  // Sample data for demo
  const sampleTransactions = [
    { id: '1', type: 'revenue', category: 'Product Sale', amount: 2500, date: new Date() },
    { id: '2', type: 'expense', category: 'Inventory', amount: 800, date: new Date() },
    { id: '3', type: 'revenue', category: 'Service Fee', amount: 1200, date: new Date() },
  ];

  const displayTransactions = businessEntries.length > 0 ? businessEntries : sampleTransactions;

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {businessProfile?.businessName || 'Business'} 📊
        </h1>
        <p className="text-muted-foreground">Your business overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Revenue */}
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="text-xl font-bold text-foreground">
            {currencySymbol}{(totalRevenue || 3700).toLocaleString()}
          </div>
        </div>

        {/* Expenses */}
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownRight className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
          <div className="text-xl font-bold text-foreground">
            {currencySymbol}{(totalExpenses || 800).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Net Profit Card */}
      <div className="p-5 rounded-2xl bg-accent text-accent-foreground shadow-elevated mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm opacity-90">Net Profit</span>
          <DollarSign className="w-5 h-5 opacity-80" />
        </div>
        <div className="text-3xl font-bold">
          {currencySymbol}{(netProfit || 2900).toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm opacity-90">+12.5% from last month</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold text-foreground">{products.length || 12}</p>
          <p className="text-xs text-muted-foreground">Products</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Wrench className="w-6 h-6 mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold text-foreground">{services.length || 5}</p>
          <p className="text-xs text-muted-foreground">Services</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-warning" />
          <p className="text-2xl font-bold text-foreground">{currencySymbol}{(totalInvestments || 5000).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Invested</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <button className="text-sm text-accent font-medium">See all</button>
        </div>
        <div className="space-y-3">
          {displayTransactions.slice(0, 5).map((entry: any) => {
            const isRevenue = entry.type === 'revenue';
            const isInvestment = entry.type === 'investment';

            return (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isRevenue ? 'bg-success/10' : isInvestment ? 'bg-warning/10' : 'bg-destructive/10'
                }`}>
                  {isRevenue ? (
                    <ArrowUpRight className="w-6 h-6 text-success" />
                  ) : isInvestment ? (
                    <BarChart3 className="w-6 h-6 text-warning" />
                  ) : (
                    <ArrowDownRight className="w-6 h-6 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{entry.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(entry.date), 'MMM d, h:mm a')}
                  </p>
                </div>
                <div className={`text-right ${
                  isRevenue ? 'text-success' : isInvestment ? 'text-warning' : 'text-destructive'
                }`}>
                  <span className="font-semibold">
                    {isRevenue ? '+' : '-'}{currencySymbol}{entry.amount.toLocaleString()}
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

export default BusinessDashboardPage;
