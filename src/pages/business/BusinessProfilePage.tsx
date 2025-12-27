import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Building2,
  User,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  Briefcase,
  Coins,
} from 'lucide-react';
import { format } from 'date-fns';

const BusinessProfilePage: React.FC = () => {
  const {
    businessProfile,
    setIsAuthenticated,
    setUserMode,
    setBusinessProfile,
  } = useApp();

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserMode(null);
    setBusinessProfile(null);
    navigate('/');
  };

  if (!businessProfile) {
    return null;
  }

  return (
    <div className="p-4 pb-8 max-w-xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Building2 className="w-12 h-12 text-accent" />
        </div>

        <h1 className="text-xl font-bold text-foreground">
          {businessProfile.businessName}
        </h1>

        <p className="text-sm text-muted-foreground">
          Business Account
        </p>
      </div>

      {/* ================= BUSINESS INFO ================= */}
      <div className="bg-card rounded-2xl border border-border p-4 space-y-5 mb-6">
        <InfoRow
          icon={User}
          label="Owner"
          value={businessProfile.ownerName}
        />

        {/* Industries (MULTI) */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Industries
            </p>
            <div className="flex flex-wrap gap-2">
              {businessProfile.industries.length > 0 ? (
                businessProfile.industries.map((industry) => (
                  <span
                    key={industry}
                    className="px-3 py-1 rounded-full text-xs font-medium
                               bg-green-100 text-green-700
                               dark:bg-green-900/30 dark:text-green-400"
                  >
                    {industry}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Currency */}
        <InfoRow
          icon={Coins}
          label="Currency"
          value={businessProfile.currency}
        />

        {/* Start Date */}
        <InfoRow
          icon={Calendar}
          label="Started"
          value={
            businessProfile.startDate
              ? format(
                  new Date(businessProfile.startDate),
                  'MMMM d, yyyy'
                )
              : '—'
          }
        />

        {/* Location */}
        {businessProfile.location?.address && (
          <InfoRow
            icon={MapPin}
            label="Location"
            value={businessProfile.location.address}
          />
        )}
      </div>

      {/* ================= ACTIONS ================= */}
      <Button
        variant="outline"
        size="lg"
        className="w-full mb-3"
        onClick={() => navigate('/mode-selection')}
      >
        <Settings className="w-5 h-5 mr-2" />
        Switch to Personal Mode
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="w-full text-destructive hover:bg-destructive/10"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

/* ================= REUSABLE ROW ================= */

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
      <Icon className="w-5 h-5 text-muted-foreground" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">
        {value || '—'}
      </p>
    </div>
  </div>
);

export default BusinessProfilePage;
