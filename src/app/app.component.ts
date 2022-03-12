import { Component, OnInit } from '@angular/core';
import { TranslationService } from './core/services/translation/translation.service';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
 

  constructor(private translate: TranslationService) {}
  ngOnInit() {
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }
  
}
