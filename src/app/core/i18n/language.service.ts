import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly STORAGE_KEY = 'app_language';
  private _currentLang: string = 'en'

  constructor(private translate: TranslateService) { }

  // Initialize language on app start
  initLanguage() {
    const savedLang = localStorage.getItem(this.STORAGE_KEY) || 'en';

    // Set default language to English
    this.translate.setDefaultLang('en');

    // Use saved language
    this.translate.use(savedLang);

    this._currentLang = savedLang;
  }

  // Switch language dynamically
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this._currentLang = lang
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  // Get current language
  get currentLanguage(): string {
    return this._currentLang;
  }
}
