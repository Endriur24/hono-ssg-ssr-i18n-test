import * as en from './translations/en.json';
import * as de from './translations/de.json';
import * as pl from './translations/pl.json';
import * as fr from './translations/fr.json';

export interface Translation {
  readonly language: string;
  readonly navigation: {
    readonly home: string;
    readonly about: string;
    readonly dynamic: string;
  };
  readonly pages: {
    readonly home: {
      readonly title: string;
      readonly greeting: string;
    };
    readonly about: {
      readonly title: string;
    };
    readonly dynamic: {
      readonly title: string;
      readonly currentTime: string;
    };
  };
  readonly notFound: {
    readonly title: string;
  };
}

export const translations = {
  en, de, pl, fr
} as const;

export type LanguageCode = keyof typeof translations;

// Type guard to check if a string is a valid language code
export const isValidLanguageCode = (code: string): code is LanguageCode => {
  return code in translations;
};

export const getValidLanguageCode = (code: string | undefined): LanguageCode => {
  return code && code in translations ? (code as LanguageCode) : "en";
};

export const parsePathLanguage = (path: string): { langCode: LanguageCode; remainingPath: string } => {
  const pathParts = path.split("/");
  const langCode = pathParts.length > 1 ? getValidLanguageCode(pathParts[1]) : "en";
  const remainingPath = pathParts[2] || "";
  
  return { langCode, remainingPath };
};

// Cached languages list for better performance
const languagesList = Object.entries(translations).map(([code, { language }]) => ({
  code: code as LanguageCode,
  language,
}));

export const getLanguagesList = () => languagesList;

export const getTranslation = (code: LanguageCode): Translation => {
  const translation = translations[code];
  if (!translation) {
    return translations.en;
  }
  return translation;
};
