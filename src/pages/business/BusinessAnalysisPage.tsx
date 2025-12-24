import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { TrendingUp, Brain, Calendar } from 'lucide-react';

const COLORS = ['#0D9488', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#10B981'];

const BusinessAnalysisPage: React.FC = () => {
  const [period, setPeriod] = useState<'monthly' | 'quarterly'>('monthly');
  const { businessEntries, businessProfile } = useApp();

  const currencySymbol = businessProfile?.currency === 'USD' ? '$' : 
                         businessProfile?.currency === 'EUR' ? '€' : '$';

  // Sample data for demo
  const revenueExpenseData = [
    { name: 'Jan', revenue: 8500, expenses: 3200 },
    { name: 'Feb', revenue: 9200, expenses: 3800 },
    { name: 'Mar', revenue: 11000, expenses: 4100 },
    { name: 'Apr', revenue: 10500, expenses: 3900 },
  ];

  const categoryData = [
    { name: 'Product Sales', value: 45000 },
    { name: 'Services', value: 28000 },
    { name: 'Subscriptions', value: 12000 },
    { name: 'Consulting', value: 8000 },
  ];

  const profitTrendData = [
    { name: 'Jan', profit: 5300 },
    { name: 'Feb', profit: 5400 },
    { name: 'Mar', profit: 6900 },
    { name: 'Apr', profit: 6600 },
  ];

  const totalRevenue = revenueExpenseData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = revenueExpenseData.reduce((sum, d) => sum + d.expenses, 0);
  const profitMargin = ((totalRevenue - totalExpenses) / totalRevenue * 100).toFixed(1);

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Business Analysis</h1>
        <p className="text-muted-foreground">Performance insights and trends</p>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setPeriod('monthly')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            period === 'monthly'
              ? 'bg-accent text-accent-foreground'
              : 'bg-card border border-border text-muted-foreground hover:border-accent/50'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setPeriod('quarterly')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            period === 'quarterly'
              ? 'bg-accent text-accent-foreground'
              : 'bg-card border border-border text-muted-foreground hover:border-accent/50'
          }`}
        >
          Quarterly
        </button>
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="mb-6 p-4 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Revenue vs Expenses</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueExpenseData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="revenue" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="mb-6 p-4 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Breakdown</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {categoryData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profit Trend */}
      <div className="mb-6 p-4 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profit Trend</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitTrendData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, 'Profit']}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Business Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-sm text-foreground">
              📈 Your profit margin is <span className="font-semibold text-success">{profitMargin}%</span>. 
              This is above the industry average of 15-20%.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-sm text-foreground">
              💰 <span className="font-semibold">Product Sales</span> generate 48% of your total revenue. 
              Consider expanding your product line.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-sm text-foreground">
              📊 March was your best performing month with <span className="font-semibold">{currencySymbol}11,000</span> in revenue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysisPage;
