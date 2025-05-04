import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'selected_language';
  
  private availableLanguagesSubject = new BehaviorSubject<Language[]>([
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文 (Chinese)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'fr', name: 'Français (French)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'de', name: 'Deutsch (German)' },
    { code: 'pt', name: 'Português (Portuguese)' }
  ]);
  
  public availableLanguages$ = this.availableLanguagesSubject.asObservable();

  constructor(private translocoService: TranslocoService) {
    // Set initial language from local storage or default to 'en'
    const savedLang = localStorage.getItem(this.LANGUAGE_KEY) || 'en';
    this.setLanguage(savedLang);
  }

  getAvailableLanguages(): Language[] {
    return this.availableLanguagesSubject.getValue();
  }

  getCurrentLanguage(): string {
    return this.translocoService.getActiveLang();
  }

  setLanguage(langCode: string): void {
    localStorage.setItem(this.LANGUAGE_KEY, langCode);
    this.translocoService.setActiveLang(langCode);
  }
}