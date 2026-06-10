import React, { useState, useEffect } from 'react';
import { t } from '../utils/translations';

// Simple global client-side cache for translations so we don't query same text repeatedly
const translationCache: Record<string, string> = {};

interface TranslatedTextProps {
  text: string;
  language: 'en' | 'hi';
  className?: string;
  isBlock?: boolean;
}

export function TranslatedText({ text, language, className = '', isBlock = false }: TranslatedTextProps) {
  const [translated, setTranslated] = useState<string>(() => {
    if (!text) return '';
    // 1. Direct translation check
    if (language === 'en') return text;
    const staticTranslated = t(text, language);
    if (staticTranslated !== text) {
      return staticTranslated; // Found in static dictionary
    }
    // 2. Check memory cache
    const cacheKey = `${text}_${language}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }
    return ''; // Needs async translation
  });

  useEffect(() => {
    if (!text) {
      setTranslated('');
      return;
    }

    if (language === 'en') {
      setTranslated(text);
      return;
    }

    const staticTranslated = t(text, language);
    if (staticTranslated !== text) {
      setTranslated(staticTranslated);
      return;
    }

    const cacheKey = `${text}_${language}`;
    if (translationCache[cacheKey]) {
      setTranslated(translationCache[cacheKey]);
      return;
    }

    let isMounted = true;
    
    // Set immediate original text fallback
    setTranslated(text);

    async function fetchTranslation() {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            targetLanguage: language,
          }),
        });

        if (!response.ok) {
          throw new Error('Translation API failed');
        }

        const data = await response.json();
        if (data.success && data.translation) {
          translationCache[cacheKey] = data.translation;
          if (isMounted) {
            setTranslated(data.translation);
          }
        }
      } catch (err) {
        console.error("Failed to translate text dynamically:", err);
      }
    }

    // Delay slightly to debounce rapid changes or transitions
    const delayTimer = setTimeout(() => {
      fetchTranslation();
    }, 150);

    return () => {
      clearTimeout(delayTimer);
      isMounted = false;
    };
  }, [text, language]);

  if (isBlock) {
    return <div className={className}>{translated || text}</div>;
  }
  return <span className={className}>{translated || text}</span>;
}
