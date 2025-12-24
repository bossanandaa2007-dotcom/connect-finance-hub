import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Briefcase, Mail, Phone, ArrowRight, Check } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

const PersonalOnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: '',
    currency: 'USD',
    occupation: '',
    phone: '+1 (555) 000-0000',
    email: 'user@example.com',
  });
  const { setUserProfile } = useApp();
  const navigate = useNavigate();

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setUserProfile(formData);
      navigate('/personal/home');
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
        return formData.fullName.length >= 2;
      case 2:
        return formData.currency && formData.occupation.length >= 2;
      case 3:
        return true;
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
          <span className="text-sm font-medium text-primary">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">Let's get to know you</h2>
            <p className="text-muted-foreground mb-8">Tell us a bit about yourself</p>

            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center border-4 border-card shadow-lg overflow-hidden">
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">Personalize your experience</h2>
            <p className="text-muted-foreground mb-8">Choose your preferences</p>

            {/* Currency Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">Preferred Currency</label>
              <div className="grid grid-cols-2 gap-3">
                {currencies.slice(0, 6).map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setFormData({ ...formData, currency: currency.code })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.currency === currency.code
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold text-foreground">{currency.symbol}</span>
                        <span className="ml-2 text-sm text-muted-foreground">{currency.code}</span>
                      </div>
                      {formData.currency === currency.code && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Occupation</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="e.g. Software Engineer"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="pl-12"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">Confirm your details</h2>
            <p className="text-muted-foreground mb-8">Review your information</p>

            <div className="space-y-4">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={formData.phone}
                    readOnly
                    className="pl-12 bg-muted/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={formData.email}
                    readOnly
                    className="pl-12 bg-muted/50"
                  />
                </div>
              </div>

              {/* Summary Card */}
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <h4 className="font-medium text-foreground mb-3">Your Profile Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency</span>
                    <span className="font-medium text-foreground">{formData.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Occupation</span>
                    <span className="font-medium text-foreground">{formData.occupation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 pb-8 space-y-3">
        <Button 
          size="lg" 
          className="w-full"
          onClick={handleNext}
          disabled={!isStepValid()}
        >
          {step === totalSteps ? 'Get Started' : 'Continue'}
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

export default PersonalOnboardingPage;
