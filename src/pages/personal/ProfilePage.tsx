import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User, Mail, Phone, Download, Shield, Globe, Share2, 
  MessageSquare, ChevronRight, LogOut, Settings
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userProfile, setIsAuthenticated, setUserMode, setUserProfile } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Download, label: 'Export Data', sublabel: 'CSV / PDF', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', sublabel: 'Manage your data', action: () => {} },
    { icon: Globe, label: 'Language', sublabel: 'English', action: () => {} },
    { icon: Share2, label: 'Share App', sublabel: 'Invite friends', action: () => {} },
    { icon: MessageSquare, label: 'Feedback', sublabel: 'Help us improve', action: () => {} },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserMode(null);
    setUserProfile(null);
    navigate('/');
  };

  const handleSwitchMode = () => {
    navigate('/mode-selection');
  };

  return (
    <div className="p-4 pb-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-4 border-card shadow-lg">
          {userProfile?.profilePicture ? (
            <img 
              src={userProfile.profilePicture} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-primary" />
          )}
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {userProfile?.fullName || 'User'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {userProfile?.occupation || 'Personal Account'}
        </p>
      </div>

      {/* Contact Info */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{userProfile?.phone || '+1 (555) 000-0000'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{userProfile?.email || 'user@example.com'}</p>
            </div>
          </div>
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
        Switch to Business Mode
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

export default ProfilePage;
