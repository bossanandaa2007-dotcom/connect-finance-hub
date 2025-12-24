import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Brain, Calendar } from 'lucide-react';

const COLORS = ['#0D9488', '#EC4899', '#F59E0B', '#8B5CF6', '#10B981', '#3B82F6', '#EF4444', '#6366F1'];

const AnalysisPage: React.FC = () => {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const { transactions, userProfile } = useApp();

  const currencySymbol = userProfile?.currency === 'USD' ? '$' : userProfile?.currency === 'EUR' ? '€' : '$';

  // Calculate category-wise expenses
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as { [key: string]: number });

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate income vs expenses
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const comparisonData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expenses', amount: totalExpenses },
  ];

  // AI Insights
  const topCategory = Object.entries(categoryData).sort((a, b) => b[1] - a[1])[0];
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analysis</h1>
        <p className="text-muted-foreground">Understand your spending patterns</p>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setPeriod('weekly')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            period === 'weekly'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setPeriod('monthly')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            period === 'monthly'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Expense Breakdown */}
      <div className="mb-6 p-4 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {pieData.map((entry, index) => (
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

      {/* Income vs Expenses */}
      <div className="mb-6 p-4 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Income vs Expenses</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, 'Amount']}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                <Cell fill="hsl(var(--success))" />
                <Cell fill="hsl(var(--destructive))" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {topCategory && (
            <div className="p-3 rounded-lg bg-card border border-border">
              <p className="text-sm text-foreground">
                💰 Your highest spending category is <span className="font-semibold text-primary">{topCategory[0]}</span> at{' '}
                <span className="font-semibold">{currencySymbol}{topCategory[1].toLocaleString()}</span>
              </p>
            </div>
          )}
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-sm text-foreground">
              📊 Your savings rate is <span className={`font-semibold ${savingsRate >= 20 ? 'text-success' : savingsRate >= 10 ? 'text-warning' : 'text-destructive'}`}>
                {savingsRate.toFixed(1)}%
              </span>
              {savingsRate >= 20 ? ' - Great job!' : savingsRate >= 10 ? ' - Room for improvement' : ' - Consider reducing expenses'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-sm text-foreground">
              💡 <span className="font-semibold">Tip:</span> Setting category budgets can help you save an extra 15-20% monthly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
