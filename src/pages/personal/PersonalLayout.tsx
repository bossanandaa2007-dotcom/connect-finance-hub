import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, PieChart, Plus, MessageCircle, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/personal/home', icon: Home, label: 'Home' },
  { path: '/personal/budget', icon: Wallet, label: 'Budget' },
  { path: '/personal/add', icon: Plus, label: 'Add', isFab: true },
  { path: '/personal/analysis', icon: PieChart, label: 'Analysis' },
  { path: '/personal/chat', icon: MessageCircle, label: 'Chat' },
];

const PersonalLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-2 pt-1 safe-area-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (item.isFab) {
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="relative -mt-8"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated hover:scale-105 transition-transform active:scale-95">
                    <Icon className="w-7 h-7" />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center py-2 px-4 rounded-lg transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
          {/* Profile Tab */}
          <button
            onClick={() => navigate('/personal/profile')}
            className={cn(
              "flex flex-col items-center py-2 px-4 rounded-lg transition-colors",
              location.pathname === '/personal/profile' ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default PersonalLayout;
