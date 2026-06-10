import React, { createContext, useContext, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistContextType {
  isVoiceActive: boolean;
  toggleVoiceAssist: () => void;
}

const VoiceAssistContext = createContext<VoiceAssistContextType | undefined>(undefined);

export function useVoiceAssist() {
  const context = useContext(VoiceAssistContext);
  if (!context) {
    throw new Error('useVoiceAssist must be used within a VoiceAssistProvider');
  }
  return context;
}

export function VoiceAssistToggle({ language }: { language: 'en' | 'hi' }) {
  const { isVoiceActive, toggleVoiceAssist } = useVoiceAssist();

  const labels = {
    en: { voiceAssist: 'Voice Assist', on: 'ON', off: 'OFF', title: 'Toggle Voice Accessibility Read-Aloud' },
    hi: { voiceAssist: 'आवाज सहायता', on: 'चालू', off: 'बंद', title: 'आवाज सहायता चालू/बंद करें' }
  };

  const tVal = labels[language] || labels.en;

  return (
    <button
      onClick={toggleVoiceAssist}
      title={tVal.title}
      id="voice-assist-toggle-btn"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-[10.5px] cursor-pointer transition shadow-3xs select-none ${
        isVoiceActive
          ? 'bg-blue-50 border-blue-250 text-blue-700 hover:bg-blue-100'
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      {isVoiceActive ? (
        <Volume2 className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      )}
      <span>
        {tVal.voiceAssist}: <strong className={isVoiceActive ? 'text-blue-700' : 'text-slate-400'}>{isVoiceActive ? tVal.on : tVal.off}</strong>
      </span>
    </button>
  );
}

interface VoiceAssistProviderProps {
  children: React.ReactNode;
  language: 'en' | 'hi';
}

export function VoiceAssistProvider({ children, language }: VoiceAssistProviderProps) {
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('voice_assist_active');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const toggleVoiceAssist = () => {
    setIsVoiceActive((prev) => {
      const newVal = !prev;
      try {
        localStorage.setItem('voice_assist_active', String(newVal));
      } catch (err) {
        console.error('Failed to save voice assist status to localStorage:', err);
      }
      
      // If voice is turned off, immediately stop speech
      if (!newVal && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return newVal;
    });
  };

  useEffect(() => {
    if (!isVoiceActive) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    let lastSpokenElement: HTMLElement | null = null;
    let lastSpokenText = '';

    // Checks if element or any ancestor is visually hidden or layout-less
    const isElementHidden = (el: HTMLElement): boolean => {
      let current: HTMLElement | null = el;
      while (current) {
        const style = window.getComputedStyle(current);
        if (
          current.offsetWidth === 0 && current.offsetHeight === 0 ||
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0'
        ) {
          return true;
        }
        current = current.parentElement;
      }
      return false;
    };

    // Resolves target to clean readable element (skipping background shells and grouping tags)
    const getSpeecheableTarget = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null;

      let current: HTMLElement | null = element;
      while (current) {
        const tag = current.tagName.toUpperCase();
        
        // Match interactive or semantic text elements
        const isNavItem = 
          current.classList.contains('sidebar-item') || 
          current.classList.contains('nav-item') ||
          current.getAttribute('role') === 'tab' ||
          current.getAttribute('role') === 'menuitem' ||
          current.tagName.toLowerCase() === 'button' ||
          current.classList.contains('cursor-pointer');

        if (
          tag === 'BUTTON' || 
          tag === 'A' || 
          tag === 'LABEL' || 
          tag === 'OPTION' || 
          tag === 'TH' || 
          tag === 'TD' ||
          tag === 'H1' || 
          tag === 'H2' || 
          tag === 'H3' || 
          tag === 'H4' || 
          tag === 'H5' || 
          tag === 'H6' || 
          tag === 'P' ||
          isNavItem
        ) {
          return current;
        }

        current = current.parentElement;
      }

      // Fallback for direct elements which are simple leaf elements holding text
      const leafTag = element.tagName.toUpperCase();
      if (leafTag === 'SPAN' || leafTag === 'LI' || leafTag === 'DIV') {
        if (element.children.length === 0) {
          return element;
        }
      }

      return null;
    };

    const speak = (text: string) => {
      if (!window.speechSynthesis) return;

      // Cancel any ongoing speech for sub-second responsiveness
      window.speechSynthesis.cancel();

      const cleanedText = text.replace(/\s+/g, ' ').trim();
      if (!cleanedText) return;

      let processedText = cleanedText;
      // Ensure budget figures (e.g., ₹31.50 Cr or 31.50 Cr) are read properly (e.g., "31.50 crores" / "31.50 करोड़")
      // instead of reading ₹ as "rupees" followed by decimal/paise and then "cr"
      const budgetRegex = /₹?\s*([0-9,]+(?:\.[0-9]+)?)\s*(?:Cr|cr|CR)\b/g;
      if (language === 'hi') {
        processedText = processedText.replace(budgetRegex, '$1 करोड़');
      } else {
        processedText = processedText.replace(budgetRegex, '$1 crores');
      }

      const utterance = new SpeechSynthesisUtterance(processedText);

      // Determine the BCP-47 language locale (India English, Hindi)
      let langTag = 'en-IN';
      if (language === 'hi') {
        langTag = 'hi-IN';
      }

      utterance.lang = langTag;

      // Try to select appropriate native speaker voice if loaded
      if (window.speechSynthesis.getVoices) {
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(
          (v) => v.lang.toLowerCase().replace('_', '-') === langTag.toLowerCase()
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        } else {
          const prefix = langTag.split('-')[0];
          const fallbackVoice = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
          if (fallbackVoice) {
            utterance.voice = fallbackVoice;
          }
        }
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      window.speechSynthesis.speak(utterance);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = getSpeecheableTarget(e.target as HTMLElement);

      if (!target) {
        // If hovered away, reset tracker and cancel active audio
        if (lastSpokenElement !== null) {
          lastSpokenElement = null;
          lastSpokenText = '';
          window.speechSynthesis.cancel();
        }
        return;
      }

      if (isElementHidden(target)) {
        return;
      }

      if (target !== lastSpokenElement) {
        lastSpokenElement = target;
        const text = (target.innerText || target.textContent || '').trim();

        if (text && text !== lastSpokenText) {
          lastSpokenText = text;
          speak(text);
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      if (lastSpokenElement !== null) {
        lastSpokenElement = null;
        lastSpokenText = '';
        window.speechSynthesis.cancel();
      }
    };

    // Bind event listeners to document
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isVoiceActive, language]);

  return (
    <VoiceAssistContext.Provider value={{ isVoiceActive, toggleVoiceAssist }}>
      {children}
    </VoiceAssistContext.Provider>
  );
}
