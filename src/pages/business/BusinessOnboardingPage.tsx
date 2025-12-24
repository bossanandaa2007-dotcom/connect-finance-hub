import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Calendar, MapPin, ArrowRight, Check, Package, Wrench, Layers } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const businessTypes = [
  { id: 'product', name: 'Product', icon: Package, description: 'Sell physical or digital products' },
  { id: 'service', name: 'Service', icon: Wrench, description: 'Offer services to clients' },
  { id: 'hybrid', name: 'Hybrid', icon: Layers, description: 'Both products and services' },
];

const BusinessOnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    businessType: '' as 'product' | 'service' | 'hybrid' | '',
    currency: 'USD',
    startDate: '',
    location: '',
  });
  const { setBusinessProfile } = useApp();
  const navigate = useNavigate();

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setBusinessProfile({
        ownerName: formData.ownerName,
        businessName: formData.businessName,
        businessType: formData.businessType as 'product' | 'service' | 'hybrid',
        currency: formData.currency,
        startDate: formData.startDate,
        location: { address: formData.location, lat: 0, lng: 0 },
      });
      navigate('/business/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.ownerName.length >= 2 && formData.businessName.length >= 2;
      case 2:
        return formData.businessType && formData.currency;
      case 3:
        return formData.startDate;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="p-6 pt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          <span className="text-sm font-medium text-accent">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">Set up your business</h2>
            <p className="text-muted-foreground mb-8">Tell us about your business</p>

            {/* Owner Name */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">Owner Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Your full name"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">Business Details</h2>
            <p className="text-muted-foreground mb-8">Choose your business type and currency</p>

            {/* Business Type */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">Business Type</label>
              <div className="space-y-3">
                {businessTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, businessType: type.id as any })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                        formData.businessType === type.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border bg-card hover:border-accent/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.businessType === type.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {formData.businessType === type.id && (
                        <Check className="w-5 h-5 text-accent" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Currency Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Business Currency</label>
              <div className="grid grid-cols-2 gap-3">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setFormData({ ...formData, currency: currency.code })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.currency === currency.code
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-card hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold text-foreground">{currency.symbol}</span>
                        <span className="ml-2 text-sm text-muted-foreground">{currency.code}</span>
                      </div>
                      {formData.currency === currency.code && (
                        <Check className="w-5 h-5 text-accent" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">Final Details</h2>
            <p className="text-muted-foreground mb-8">When did your business start?</p>

            {/* Start Date */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">Business Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Business Location (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your business address"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-4 h-48 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Map preview will appear here</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 pb-8 space-y-3">
        <Button 
          size="lg" 
          className="w-full bg-accent hover:bg-accent/90"
          onClick={handleNext}
          disabled={!isStepValid()}
        >
          {step === totalSteps ? 'Launch Dashboard' : 'Continue'}
          <ArrowRight className="w-5 h-5" />
        </Button>
        {step > 1 && (
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default BusinessOnboardingPage;
