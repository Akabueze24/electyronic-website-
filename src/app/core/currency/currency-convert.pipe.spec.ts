import { CurrencyConvertPipe } from './currency-convert.pipe';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyService } from './currency.service';

describe('CurrencyConvertPipe', () => {
  let pipe: CurrencyConvertPipe;

  // Mock ChangeDetectorRef
  const mockCD: ChangeDetectorRef = {
    markForCheck: jasmine.createSpy('markForCheck')
  } as any;

  // Mock CurrencyService
  const mockCurrencyService: Partial<CurrencyService> = {
    selectedCurrency$: new BehaviorSubject<string>('USD'),
    getSelectedCurrency: () => 'USD',
    convert: (value: number) => value,
    getSymbol: (currency: string) => '$'
  };

  beforeEach(() => {
    pipe = new CurrencyConvertPipe(mockCurrencyService as CurrencyService, mockCD);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert value correctly', () => {
    const result = pipe.transform(100);
    expect(result).toBe('$ 100');
  });

  it('should react to currency change', () => {
    // Change the currency in BehaviorSubject
    (mockCurrencyService.selectedCurrency$ as BehaviorSubject<string>).next('EUR');
    
    const result = pipe.transform(200);
    // Since convert() just returns value in mock, only symbol changes
    expect(result).toBe('$ 200'); // still uses $ because getSymbol mock returns '$'
    
    // The important part is that markForCheck is called
    expect(mockCD.markForCheck).toHaveBeenCalled();
  });
});
