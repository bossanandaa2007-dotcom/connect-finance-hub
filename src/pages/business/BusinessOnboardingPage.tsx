import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  User,
  Building2,
  ArrowRight,
  MapPin,
  Calendar,
} from 'lucide-react';

/* =========================
   CONSTANTS
========================= */

const INDUSTRIES = [
  'Automotive',
  'Consumer Goods & Retail',
  'Education',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Manufacturing',
  'Professional Services',
  'Technology',
  'Hospitality & Food Services',
  'Real Estate & Construction',
  'Logistics & Transportation',
  'Media & Marketing',
  'Freelancer / Consultant',
  'Other',
];

const COUNTRIES = [
  { code: 'INR', flag: '🇮🇳' },
  { code: 'USD', flag: '🇺🇸' },
  { code: 'GBP', flag: '🇬🇧' },
  { code: 'EUR', flag: '🇪🇺' },
];

const BUSINESS_PLACES = [
  'Office',
  'Home Office',
  'Virtual Business',
  'Hybrid (Office + Remote)',
];

/* =========================
   VALIDATION
========================= */

const isValidOwnerName = (v: string) =>
  /^[A-Za-z ]+$/.test(v.trim()) && v.trim().length >= 2;

const isValidBusinessName = (v: string) =>
  /^[A-Za-z .,&\-()]+$/.test(v.trim()) && v.trim().length >= 2;

/* =========================
   COMPONENT
========================= */

const BusinessOnboardingPage: React.FC = () => {
  const { setBusinessProfile } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [ownerNameError, setOwnerNameError] = useState('');

  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    industries: [] as string[],
    currency: '',
    startDate: '',
    businessPlace: '',
    location: '',
  });

  /* =========================
     HELPERS
  ========================= */

  const toggleIndustry = (industry: string) => {
    setFormData((prev) => {
      if (prev.industries.includes(industry)) {
        return {
          ...prev,
          industries: prev.industries.filter((i) => i !== industry),
        };
      }
      if (prev.industries.length >= 4) return prev;
      return { ...prev, industries: [...prev.industries, industry] };
    });
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        isValidOwnerName(formData.ownerName) &&
        isValidBusinessName(formData.businessName)
      );
    }

    if (step === 2) {
      return formData.industries.length > 0 && !!formData.currency;
    }

    if (step === 3) {
      if (!formData.businessPlace) return false;
      if (
        formData.businessPlace !== 'Virtual Business' &&
        !formData.location
      )
        return false;
      return true;
    }

    return false;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setBusinessProfile({
      ownerName: formData.ownerName.trim(),
      businessName: formData.businessName.trim(),
      industries: formData.industries,
      currency: formData.currency,
      startDate: formData.startDate || undefined,
      location:
        formData.businessPlace === 'Virtual Business'
          ? undefined
          : {
              address: formData.location,
              lat: 0,
              lng: 0,
            },
    });

    navigate('/business/dashboard');
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-xl px-6 py-8 space-y-8">

        {/* PROGRESS */}
        <div>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Set up your business</h2>

            <div>
              <label className="text-sm font-medium">Owner Name</label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  value={formData.ownerName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, ownerName: value });

                    if (!/^[A-Za-z ]*$/.test(value)) {
                      setOwnerNameError(
                        'Only alphabets are allowed. Numbers and special characters are not permitted.'
                      );
                    } else {
                      setOwnerNameError('');
                    }
                  }}
                />
              </div>

              {ownerNameError && (
                <p className="text-sm text-red-500 mt-1">
                  {ownerNameError}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Business Name</label>
              <div className="relative mt-2">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Business Details</h2>

            <div>
              <label className="text-sm font-medium">
                Industries (max 4)
              </label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {INDUSTRIES.map((i) => {
                  const active = formData.industries.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleIndustry(i)}
                      className={`px-3 py-2 rounded-lg border text-sm text-left transition
                        ${
                          active
                            ? 'bg-green-100 border-green-600 text-green-700'
                            : 'hover:border-green-400'
                        }`}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Currency</label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() =>
                      setFormData({ ...formData, currency: c.code })
                    }
                    className={`px-4 py-3 rounded-lg border flex items-center gap-3
                      ${
                        formData.currency === c.code
                          ? 'bg-green-100 border-green-600'
                          : 'hover:border-green-400'
                      }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="font-medium">{c.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Final Details</h2>

            <div>
              <label className="text-sm font-medium">
                Start Date (Optional)
              </label>
              <div className="relative mt-2">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Business Place</label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {BUSINESS_PLACES.map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      setFormData({ ...formData, businessPlace: p })
                    }
                    className={`px-3 py-2 rounded-lg border text-sm
                      ${
                        formData.businessPlace === p
                          ? 'bg-green-100 border-green-600 text-green-700'
                          : 'hover:border-green-400'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {formData.businessPlace !== 'Virtual Business' && (
              <div>
                <label className="text-sm font-medium">Business Location</label>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      'https://www.google.com/maps',
                      '_blank'
                    )
                  }
                  className={`w-full mt-2 px-4 py-3 rounded-lg border flex items-center gap-3
                    ${
                      formData.location
                        ? 'bg-green-50 border-green-600'
                        : 'hover:border-green-400'
                    }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {formData.location || 'Select from map'}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ACTION */}
        <Button
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!isStepValid()}
          onClick={handleNext}
        >
          {step === 3 ? 'Launch Dashboard' : 'Continue'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default BusinessOnboardingPage;
