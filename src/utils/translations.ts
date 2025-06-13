import { en } from '@/locales/en';

export type TranslationsType = typeof en;

class Translations {
  private static instance: Translations;
  private currentLocale: string = 'en';
  private translations: { [key: string]: TranslationsType } = { en };

  private constructor() {}

  public static getInstance(): Translations {
    if (!Translations.instance) {
      Translations.instance = new Translations();
    }
    return Translations.instance;
  }

  public setLocale(locale: string) {
    if (this.translations[locale]) {
      this.currentLocale = locale;
    } else {
      console.warn(`Locale ${locale} not found, falling back to English`);
      this.currentLocale = 'en';
    }
  }

  public t<T = string>(path: string): T {
    const keys = path.split('.');
    let current: any = this.translations[this.currentLocale];

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key "${path}" not found`);
        return path as unknown as T;
      }
      current = current[key];
    }

    return current as T;
  }

  public getCurrentLocale(): string {
    return this.currentLocale;
  }

  public async addLocale(locale: string, translations: TranslationsType) {
    this.translations[locale] = translations;
  }
}

export const i18n = Translations.getInstance();

// React hook for translations
import { useState, useEffect } from 'react';

type TranslationKey = keyof typeof en;

export function useTranslation() {
  // For now, we'll just use English. Later we can add language switching
  const t = <T>(key: string): T => {
    return getNestedValue(en, key) as T;
  };

  return { t };
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== 'undefined' ? current[key] : undefined;
  }, obj);
} 