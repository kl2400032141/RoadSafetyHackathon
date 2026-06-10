import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, X, ArrowRight, UserPlus, LogIn, ChevronRight, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, name?: string) => void;
  language: 'en' | 'hi';
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, language }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const translations = {
    en: {
      loginTitle: "Access RoadLens AI",
      signUpTitle: "Create Citizen Account",
      loginSub: "Sign in to witness local public road budget integrity, query PWD/NHAI jurisdictions, and endorse safety concerns.",
      signUpSub: "Join thousands of active citizens auditing infrastructure allocations and reporting potholes or safety bugs.",
      emailLabel: "Email Address",
      passwordLabel: "Account Password",
      nameLabel: "Your Name",
      emailPlaceholder: "e.g. arjun.mehta@example.com",
      passwordPlaceholder: "Enter password",
      namePlaceholder: "e.g. Arjun Mehta",
      loginBtn: "Sign In Securely",
      signUpBtn: "Register Citizen Profile",
      continueAsGuest: "Continue as Guest",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      createAccountLink: "Create an Account",
      signInLink: "Sign In instead",
      errorEmpty: "Please enter both a valid email and pass code.",
      nameEmpty: "Please enter your full name.",
      regSuccess: "Account layout simulation created! You can now log in.",
      verifiedText: "Verified Resident",
      guestMode: "Browsing in Guest Mode"
    },
    hi: {
      loginTitle: "रोडलेंस एआई तक पहुंचें",
      signUpTitle: "नागरिक खाता बनाएं",
      loginSub: "स्थानीय सार्वजनिक सड़क बजट अखंडता गवाही देखने, पीडब्ल्यूडी/एनएचएआई क्षेत्राधिकारों से पूछताछ करने, और सुरक्षा चिंताओं का समर्थन करने के लिए साइन इन करें।",
      signUpSub: "बुनियादी ढांचा आवंटन का ऑडिट करने और गड्ढों या सुरक्षा समस्याओं की रिपोर्ट करने वाले हजारों सक्रिय नागरिकों में शामिल हों।",
      emailLabel: "ईमेल पता",
      passwordLabel: "खाता पासवर्ड",
      nameLabel: "आपका नाम",
      emailPlaceholder: "जैसे: arjun.mehta@example.com",
      passwordPlaceholder: "पासवर्ड दर्ज करें",
      namePlaceholder: "जैसे: अर्जुन मेहता",
      loginBtn: "सुरक्षित रूप से साइन इन करें",
      signUpBtn: "नागरिक प्रोफ़ाइल पंजीकृत करें",
      continueAsGuest: "अतिथि के रूप में जारी रखें",
      dontHaveAccount: "क्या आपका खाता नहीं है?",
      alreadyHaveAccount: "पहले से ही एक खाता है?",
      createAccountLink: "खाता बनाएं",
      signInLink: "इसके बजाय साइन इन करें",
      errorEmpty: "कृपया एक वैध ईमेल और पास कोड दोनों दर्ज करें।",
      nameEmpty: "कृपया अपना पूरा नाम दर्ज करें।",
      regSuccess: "खाता लेआउट सिमुलेशन बनाया गया! अब आप लॉग इन कर सकते हैं।",
      verifiedText: "सत्यापित निवासी",
      guestMode: "अतिथि मोड में ब्राउज़ कर रहे हैं"
    }
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isSignUp) {
      if (!email.trim() || !password.trim()) {
        setError(t.errorEmpty);
        return;
      }
      if (!name.trim()) {
        setError(t.nameEmpty);
        return;
      }
      setSuccessMsg(t.regSuccess);
      setTimeout(() => {
        setIsSignUp(false);
        setSuccessMsg('');
      }, 2000);
    } else {
      if (!email.trim() || !password.trim()) {
        setError(t.errorEmpty);
        return;
      }

      // Successful login
      onLoginSuccess(email, name || 'Citizen User');
      setEmail('');
      setPassword('');
      setName('');
      setError('');
      onClose();
    }
  };

  const handleGuestContinue = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10 flex flex-col"
          >
            {/* Header decor */}
            <div className="h-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 w-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition duration-150 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner Content */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-extrabold mb-3">
                  RL
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                  {isSignUp ? t.signUpTitle : t.loginTitle}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isSignUp ? t.signUpSub : t.loginSub}
                </p>
              </div>

              {/* Error or Success Banner */}
              {error && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-100 animate-pulse">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-100">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-705 uppercase tracking-wider block">
                      {t.nameLabel}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full pl-10 pr-3 py-2 text-xs border border-slate-205 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-705 uppercase tracking-wider block">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-10 pr-3 py-2 text-xs border border-slate-205 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-705 uppercase tracking-wider block">
                    {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full pl-10 pr-3 py-2 text-xs border border-slate-205 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-sm hover:shadow"
                >
                  {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  <span>{isSignUp ? t.signUpBtn : t.loginBtn}</span>
                </button>
              </form>

              {/* Action buttons divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-150"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">or</span>
                <div className="flex-grow border-t border-slate-150"></div>
              </div>

              {/* Guest continue */}
              <button
                onClick={handleGuestContinue}
                className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition duration-150"
              >
                <span>{t.continueAsGuest}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Bottom toggle between Login and Sign Up */}
              <div className="text-center text-xs">
                <span className="text-slate-455 font-medium">{isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount} </span>
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  {isSignUp ? t.signInLink : t.createAccountLink}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
