import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { User, Building2, ArrowRight, Wallet } from 'lucide-react';

const ModeSelectionPage: React.FC = () => {
  const { setUserMode } = useApp();
  const navigate = useNavigate();

  const handleModeSelect = (mode: 'personal' | 'business') => {
    setUserMode(mode);
    if (mode === 'personal') {
      navigate('/personal/onboarding');
    } else {
      navigate('/business/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Header */}
        <div className="animate-fade-in mb-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            How do you want to use the app?
          </h1>
          <p className="text-muted-foreground">
            Choose your tracking mode to get started
          </p>
        </div>

        {/* Mode Cards */}
        <div className="w-full max-w-md space-y-4 animate-slide-up">
          {/* Personal Mode */}
          <button
            onClick={() => handleModeSelect('personal')}
            className="w-full p-6 bg-card rounded-2xl border-2 border-border shadow-card hover:border-primary hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <User className="w-7 h-7 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Personal Expense Tracker
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track your daily spending, set budgets, and manage personal finances with ease.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </button>

          {/* Business Mode */}
          <button
            onClick={() => handleModeSelect('business')}
            className="w-full p-6 bg-card rounded-2xl border-2 border-border shadow-card hover:border-primary hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Business Expense Tracker
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage business expenses, track revenue, products, services, and profits.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>

        {/* Info Note */}
        <p className="mt-8 text-sm text-muted-foreground text-center max-w-sm">
          You can switch between modes anytime from your profile settings.
        </p>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
