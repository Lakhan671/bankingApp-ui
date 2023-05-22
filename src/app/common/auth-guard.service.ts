import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertService } from '../services/Alert.service';
import { AuthService } from '../services/auth.service';
import { UIConstant } from './ui.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (this.authService.loggedIn()) {
    return true;
  }
    this.alertService.warning(UIConstant.SIGN_IN,UIConstant.ERROR);
    this.router.navigate(['/']);
    return false;
  }
}
