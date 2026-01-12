import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private rates: { [key: string]: number } = {};

  // Selected currency (single value)
  private selectedCurrency = new BehaviorSubject<string>('USD');
  selectedCurrency$ = this.selectedCurrency.asObservable();

  // All available currencies (reactive)
  private currenciesSubject = new BehaviorSubject<string[]>([]);
  currencies$ = this.currenciesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadRates();
  }

  private loadRates() {
    const savedRates = localStorage.getItem('currencyRates');
    if (savedRates) {
      this.rates = JSON.parse(savedRates);
      this.currenciesSubject.next(Object.keys(this.rates));
    } else {
      this.http.get('https://api.exchangerate-api.com/v4/latest/USD')
        .subscribe((data: any) => {
          this.rates = data.rates;
          this.currenciesSubject.next(Object.keys(this.rates));
          localStorage.setItem('currencyRates', JSON.stringify(this.rates));
          console.log('Fetched rates:', this.rates);
        });
    }

    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) this.selectedCurrency.next(savedCurrency);
  }

  setCurrency(currency: string) {
    this.selectedCurrency.next(currency);
    localStorage.setItem('selectedCurrency', currency);
    console.log('Currency changed to:', currency);
  }

  getSelectedCurrency(): string {
    return this.selectedCurrency.value;
  }

  convert(amount: number): number {
    const rate = this.rates[this.getSelectedCurrency()] || 1;
    return +(amount * rate).toFixed(2);
  }

  getSymbol(currency: string): string {
    const map: { [key: string]: string } = {
      USD: '$', AED: 'AED', AFN: 'AFN', ALL: 'ALL', AMD: 'AMD', ANG: 'ANG', AOA: 'AOA',
      ARS: 'ARS', AUD: 'A$', AWG: 'AWG', AZN: 'AZN', BAM: 'BAM', BBD: 'BBD', BDT: 'BDT',
      BGN: 'BGN', BHD: 'BHD', BIF: 'BIF', BMD: 'BMD', BND: 'BND', BOB: 'BOB', BRL: 'R$',
      BSD: 'BSD', BTN: 'BTN', BWP: 'BWP', BYN: 'BYN', BZD: 'BZD', CAD: 'C$', CDF: 'CDF',
      CHF: 'CHF', CLF: 'CLF', CLP: 'CLP', CNH: 'CNH', CNY: '¥', COP: 'COP', CRC: 'CRC',
      CUP: 'CUP', CVE: 'CVE', CZK: 'CZK', DJF: 'DJF', DKK: 'DKK', DOP: 'DOP', DZD: 'DZD',
      EGP: 'EGP', ERN: 'ERN', ETB: 'ETB', EUR: '€', FJD: 'FJD', FKP: 'FKP', FOK: 'FOK',
      GBP: '£', GEL: 'GEL', GGP: 'GGP', GHS: 'GHS', GIP: 'GIP', GMD: 'GMD', GNF: 'GNF',
      GTQ: 'GTQ', GYD: 'GYD', HKD: 'HK$', HNL: 'HNL', HRK: 'HRK', HTG: 'HTG', HUF: 'HUF',
      IDR: 'IDR', ILS: '₪', IMP: 'IMP', INR: '₹', IQD: 'IQD', IRR: 'IRR', ISK: 'ISK',
      JEP: 'JEP', JMD: 'JMD', JOD: 'JOD', JPY: '¥', KES: 'KES', KGS: 'KGS', KHR: 'KHR',
      KID: 'KID', KMF: 'KMF', KRW: '₩', KWD: 'KWD', KYD: 'KYD', KZT: 'KZT', LAK: 'LAK',
      LBP: 'LBP', LKR: 'LKR', LRD: 'LRD', LSL: 'LSL', LYD: 'LYD', MAD: 'MAD', MDL: 'MDL',
      MGA: 'MGA', MKD: 'MKD', MMK: 'MMK', MNT: 'MNT', MOP: 'MOP', MRU: 'MRU', MUR: 'MUR',
      MVR: 'MVR', MWK: 'MWK', MXN: 'MX$', MYR: 'RM', MZN: 'MZN', NAD: 'NAD', NGN: '₦',
      NIO: 'NIO', NOK: 'NOK', NPR: 'NPR', NZD: 'NZ$', OMR: 'OMR', PAB: 'PAB', PEN: 'PEN',
      PGK: 'PGK', PHP: '₱', PKR: 'PKR', PLN: 'zł', PYG: 'PYG', QAR: 'QAR', RON: 'RON',
      RSD: 'RSD', RUB: '₽', RWF: 'RWF', SAR: 'SAR', SBD: 'SBD', SCR: 'SCR', SDG: 'SDG',
      SEK: 'SEK', SGD: 'S$', SHP: 'SHP', SLE: 'SLE', SLL: 'SLL', SOS: 'SOS', SRD: 'SRD',
      SSP: 'SSP', STN: 'STN', SYP: 'SYP', SZL: 'SZL', THB: '฿', TJS: 'TJS', TMT: 'TMT',
      TND: 'TND', TOP: 'TOP', TRY: '₺', TTD: 'TTD', TVD: 'TVD', TWD: 'NT$', TZS: 'TZS',
      UAH: '₴', UGX: 'UGX', UYU: 'UYU', UZS: 'UZS', VES: 'VES', VND: '₫', VUV: 'VUV',
      WST: 'WST', XAF: 'XAF', XCD: 'XCD', XCG: 'XCG', XDR: 'XDR', XOF: 'XOF', XPF: 'XPF',
      YER: 'YER', ZAR: 'R', ZMW: 'ZMW', ZWG: 'ZWG', ZWL: 'ZWL'
    };
    return map[currency] || currency;
  }
}
