import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.scss']
})
export class CardLoginComponent implements OnInit {
  lang!: string;
  mainForm: FormGroup = new FormGroup({});
  constructor(
    private translateService: TranslationService,
    private fb: FormBuilder,
    private localStorage: StorageService,
    private alertService: AlertService,
    private router: Router
    ) { 
      this.mainForm = this.fb.group({
        userName: ['', [Validators.required,Validators.minLength(5)]],
        password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
      });
    }

  ngOnInit(): void {
    this.translateService.currentLanguage$.subscribe((lang) => {
      this.lang = lang;
    });
  }

  login() {
    if(this.mainForm.value.userName == "admin" && this.mainForm.value.password == "Admin@123"){
      this.localStorage.setHash('basic-token','admin:Admin@123');
      let expDate = moment(new Date()).add(1,"days").toDate();
      this.localStorage.setHash('expireDate', expDate);
      this.router.navigate(['/store/']);
    }
    else{      
      this.alertService.error("Invalid UserName Or Password!");
    }    
  }
}
