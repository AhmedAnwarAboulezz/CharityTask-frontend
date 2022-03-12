import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { AlertService } from '../../services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private localStorage: StorageService,
    private alertService: AlertService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url.includes('card-login')) {
        return true;
    }
    else  {
      try{
        let basicAuth = this.localStorage.getHash('basic-token');
        let expDate = this.localStorage.getHash('expireDate');
        if(basicAuth == undefined 
          || basicAuth == null 
          || basicAuth == ""
          || basicAuth !== 'admin:Admin@123'
          || expDate == undefined  
          || expDate == null 
          || new Date(expDate) <= new Date()
        )
        {
          this.alertService.warning('sorry you need to login again');
          this.router.navigate(['/store/card-login']);
          return false;
        }
        else{
          return true;
  
        }
      }
      catch{
        debugger;
        this.alertService.warning('sorry you need to login again');
        this.router.navigate(['/error/404']);
        return false;
      }
    }
  }
}
