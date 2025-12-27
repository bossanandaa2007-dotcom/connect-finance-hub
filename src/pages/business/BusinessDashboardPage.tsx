import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import {
  TrendingUp,
  DollarSign,
  Package,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import { format } from 'date-fns';

const BusinessDashboardPage: React.FC = () => {
  const { businessProfile, businessEntries, products, services } = useApp();
  const navigate = useNavigate();

  const currencySymbol =
    businessProfile?.currency === 'USD'
      ? '$'
      : businessProfile?.currency === 'EUR'
      ? '€'
      : businessProfile?.currency === 'GBP'
      ? '£'
      : '₹';

  const totalRevenue = businessEntries
    .filter((e) => e.type === 'revenue')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = businessEntries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalInvestments = businessEntries
    .filter((e) => e.type === 'investment')
    .reduce((sum, e) => sum + e.amount, 0);

  const netProfit = totalRevenue - totalExpenses;

  const sampleTransactions = [
    { id: '1', type: 'revenue', category: 'Product Sale', amount: 2500, date: new Date() },
    { id: '2', type: 'expense', category: 'Inventory', amount: 800, date: new Date() },
    { id: '3', type: 'revenue', category: 'Service Fee', amount: 1200, date: new Date() },
  ];

  const displayTransactions =
    businessEntries.length > 0 ? businessEntries : sampleTransactions;

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {businessProfile?.businessName || 'Business'} 📊
        </h1>
        <p className="text-muted-foreground">Your business overview</p>
      </div>

      {/* Revenue & Expenses */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-success/10 border">
          <ArrowUpRight className="w-4 h-4 text-success mb-2" />
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="text-xl font-bold">
            {currencySymbol}{(totalRevenue || 3700).toLocaleString()}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-destructive/10 border">
          <ArrowDownRight className="w-4 h-4 text-destructive mb-2" />
          <p className="text-sm text-muted-foreground">Expenses</p>
          <p className="text-xl font-bold">
            {currencySymbol}{(totalExpenses || 800).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Net Profit */}
      <div className="p-5 rounded-2xl bg-accent text-accent-foreground mb-6">
        <DollarSign className="w-5 h-5 mb-2" />
        <p className="text-sm opacity-90">Net Profit</p>
        <p className="text-3xl font-bold">
          {currencySymbol}{(netProfit || 2900).toLocaleString()}
        </p>
      </div>

      {/* Products / Services / Investments */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-card border text-center">
          <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{products.length || 12}</p>
          <p className="text-xs text-muted-foreground">Products</p>
        </div>

        <div className="p-4 rounded-xl bg-card border text-center">
          <Wrench className="w-6 h-6 mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold">{services.length || 5}</p>
          <p className="text-xs text-muted-foreground">Services</p>
        </div>

        {/* ✅ FIXED INVESTMENT CARD */}
        <div
          onClick={() => navigate('/business/investments')}
          className="p-4 rounded-xl bg-card border text-center cursor-pointer
                     transition hover:shadow-md active:scale-95"
        >
          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-warning" />
          <p className="font-bold text-xl sm:text-2xl truncate max-w-full">
            {currencySymbol}{(totalInvestments || 5000).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Invested</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {displayTransactions.map((entry: any) => (
            <div
              key={entry.id}
              className="flex justify-between p-4 bg-card border rounded-xl"
            >
              <div>
                <p className="font-medium">{entry.category}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(entry.date), 'MMM d, h:mm a')}
                </p>
              </div>
              <p className="font-semibold">
                {currencySymbol}{entry.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardPage;
