import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'currencyConvert',
  pure: false
})
export class CurrencyConvertPipe implements PipeTransform, OnDestroy {
  private currencySub!: Subscription;

  constructor(private currencyService: CurrencyService, private cd: ChangeDetectorRef) {
    this.currencySub = this.currencyService.selectedCurrency$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  transform(value: number): string {
    const converted = this.currencyService.convert(value);
    const symbol = this.currencyService.getSymbol(this.currencyService.getSelectedCurrency());
    return `${symbol} ${converted}`;
  }

  ngOnDestroy() {
    if (this.currencySub) this.currencySub.unsubscribe();
  }
}
