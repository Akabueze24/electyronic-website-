import { Component, OnInit } from '@angular/core';
import { LanguageService } from './core/i18n/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'electronicsWebsite';
  constructor(private languageService: LanguageService){}

  ngOnInit(): void {
    this.languageService.initLanguage()
  }
}