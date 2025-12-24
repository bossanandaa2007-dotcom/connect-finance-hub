import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, User, MapPin, Download, Shield, Globe, Share2, 
  MessageSquare, ChevronRight, LogOut, Settings, Calendar, Package
} from 'lucide-react';
import { format } from 'date-fns';

const BusinessProfilePage: React.FC = () => {
  const { businessProfile, setIsAuthenticated, setUserMode, setBusinessProfile } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Download, label: 'Export Data', sublabel: 'CSV / PDF / Excel', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', sublabel: 'Manage business data', action: () => {} },
    { icon: Globe, label: 'Language', sublabel: 'English', action: () => {} },
    { icon: MessageSquare, label: 'Feedback', sublabel: 'Help us improve', action: () => {} },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserMode(null);
    setBusinessProfile(null);
    navigate('/');
  };

  const handleSwitchMode = () => {
    navigate('/mode-selection');
  };

  const businessTypeLabel = {
    product: 'Product-based',
    service: 'Service-based',
    hybrid: 'Hybrid',
  };

  return (
    <div className="p-4 pb-8">
      {/* Business Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 border-4 border-card shadow-lg">
          <Building2 className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {businessProfile?.businessName || 'My Business'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {businessProfile?.businessType ? businessTypeLabel[businessProfile.businessType] : 'Business Account'}
        </p>
      </div>

      {/* Business Info */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Business Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="font-medium text-foreground">{businessProfile?.ownerName || 'Business Owner'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Business Type</p>
              <p className="font-medium text-foreground">
                {businessProfile?.businessType ? businessTypeLabel[businessProfile.businessType] : 'Not set'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Started</p>
              <p className="font-medium text-foreground">
                {businessProfile?.startDate 
                  ? format(new Date(businessProfile.startDate), 'MMMM d, yyyy')
                  : 'Not set'}
              </p>
            </div>
          </div>
          {businessProfile?.location?.address && (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{businessProfile.location.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.sublabel}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Switch Mode */}
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full mb-3"
        onClick={handleSwitchMode}
      >
        <Settings className="w-5 h-5" />
        Switch to Personal Mode
      </Button>

      {/* Logout */}
      <Button 
        variant="ghost" 
        size="lg" 
        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </div>
  );
};

export default BusinessProfilePage;
