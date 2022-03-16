import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StorageService } from '../../storage/storage.service';

@Component({
  selector: 'app-store-toolbar',
  templateUrl: './store-toolbar.component.html',
  styleUrls: ['./store-toolbar.component.scss']
})
export class StoreToolbarComponent implements OnInit {
  lang: any;
  @Input() cartCount = 0;
   
  constructor(
    private translateService: TranslationService,
    private router: Router,
    private localStorage: StorageService
    ) { }

  ngOnInit(): void {
    this.translateService.currentLanguage$.subscribe(lang => { this.lang = lang;  });
  }

  goToMyCards(){
    this.router.navigate(['/store/my-cart']);
  }
  goToHelp(){
    this.router.navigate(['/store/terms-conditions']);
  }
  changeLanguage() {
    this.translateService.changeLanguage();
  }
  logout(){
    this.localStorage.clearStorage();
    this.router.navigate(['/store/card-login']);

  }

}
