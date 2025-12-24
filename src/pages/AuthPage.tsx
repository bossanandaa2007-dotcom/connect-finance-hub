import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Wallet, Phone, Mail, ArrowRight, Chrome } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<'phone' | null>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const { setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    setIsAuthenticated(true);
    navigate('/mode-selection');
  };

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setIsAuthenticated(true);
      navigate('/mode-selection');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo Section */}
        <div className="animate-fade-in mb-12 text-center">
          <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-elevated">
            <Wallet className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Connect</h1>
          <p className="text-lg text-muted-foreground">Expense Tracker</p>
        </div>

        {/* Auth Options */}
        <div className="w-full max-w-sm space-y-4 animate-slide-up">
          {!authMethod && !showOtp && (
            <>
              {/* Google Sign In */}
              <Button 
                variant="google" 
                size="lg" 
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-4 text-muted-foreground">or</span>
                </div>
              </div>

              {/* Phone Auth */}
              <Button 
                variant="phone" 
                size="lg" 
                className="w-full"
                onClick={() => setAuthMethod('phone')}
              >
                <Phone className="w-5 h-5" />
                Continue with Phone
              </Button>
            </>
          )}

          {authMethod === 'phone' && !showOtp && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Enter your phone number</h2>
                <p className="text-sm text-muted-foreground mt-1">We'll send you a verification code</p>
              </div>
              
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12"
                />
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={handleSendOtp}
                disabled={phone.length < 10}
              >
                Send OTP
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setAuthMethod(null)}
              >
                Back
              </Button>
            </div>
          )}

          {showOtp && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Verify your number</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the 6-digit code sent to {phone}
                </p>
              </div>
              
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                className="text-center text-2xl tracking-[0.5em] font-mono"
                maxLength={6}
              />

              <Button 
                size="lg" 
                className="w-full"
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
              >
                Verify & Continue
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setShowOtp(false)}
              >
                Change number
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <span className="text-primary">Terms of Service</span> and{' '}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
