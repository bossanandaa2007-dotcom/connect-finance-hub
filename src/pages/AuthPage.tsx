import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Wallet, Phone, Chrome, ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

/* 🔥 TOP 15 COUNTRIES (FLAG EMOJI + DIAL CODE) */
const COUNTRIES = [
  { code: "IN", dial: "+91", flag: "🇮🇳" },
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
  { code: "DE", dial: "+49", flag: "🇩🇪" },
  { code: "FR", dial: "+33", flag: "🇫🇷" },
  { code: "IT", dial: "+39", flag: "🇮🇹" },
  { code: "ES", dial: "+34", flag: "🇪🇸" },
  { code: "BR", dial: "+55", flag: "🇧🇷" },
  { code: "MX", dial: "+52", flag: "🇲🇽" },
  { code: "CN", dial: "+86", flag: "🇨🇳" },
  { code: "JP", dial: "+81", flag: "🇯🇵" },
  { code: "KR", dial: "+82", flag: "🇰🇷" },
  { code: "SG", dial: "+65", flag: "🇸🇬" },
];

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useApp();

  const [step, setStep] = useState<"main" | "phone" | "otp">("main");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] =
    useState<ConfirmationResult | null>(null);

  /* GOOGLE LOGIN */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
      navigate("/mode-selection");
    } catch (e: any) {
      alert(e.message);
    }
  };

  /* SEND OTP — SAFE RECAPTCHA INIT */
  const sendOtp = async () => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const fullPhone = `${country.dial}${phone}`;

      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      setStep("otp");
    } catch (e: any) {
      alert(e.message);
    }
  };

  /* VERIFY OTP */
  const verifyOtp = async () => {
    if (!confirmation) return;
    try {
      await confirmation.confirm(otp);
      setIsAuthenticated(true);
      navigate("/mode-selection");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm px-6 space-y-6 text-center">

        {/* LOGO */}
        <div>
          <div className="w-20 h-20 mx-auto bg-primary rounded-3xl flex items-center justify-center">
            <Wallet className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mt-4">Connect</h1>
          <p className="text-muted-foreground">Expense Tracker</p>
        </div>

        {/* MAIN LOGIN */}
        {step === "main" && (
          <>
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleGoogleLogin}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="text-muted-foreground">or</div>

            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => setStep("phone")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Continue with Phone
            </Button>
          </>
        )}

        {/* PHONE INPUT */}
        {step === "phone" && (
          <>
            <div className="flex items-center gap-2">
              {/* COUNTRY PICKER */}
              <select
                className="h-11 w-[90px] shrink-0 rounded-md border bg-background px-2 text-sm"
                value={country.code}
                onChange={(e) =>
                  setCountry(
                    COUNTRIES.find(c => c.code === e.target.value)!
                  )
                }
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>

              {/* PHONE NUMBER */}
              <Input
                className="h-11 flex-1"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={sendOtp}
              disabled={phone.length < 6}
            >
              Send OTP <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button variant="ghost" onClick={() => setStep("main")}>
              Back
            </Button>
          </>
        )}

        {/* OTP */}
        {step === "otp" && (
          <>
            <Input
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              className="text-center text-2xl tracking-widest"
            />

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={verifyOtp}
              disabled={otp.length !== 6}
            >
              Verify & Continue
            </Button>
          </>
        )}

        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>

      {/* REQUIRED FOR FIREBASE */}
      <div id="recaptcha-container" />
    </div>
  );
};

export default AuthPage;
