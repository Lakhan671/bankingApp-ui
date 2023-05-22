import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/common/auth-guard.service';
import { UIConstant } from 'src/app/common/ui.constant';
import { AlertService } from 'src/app/services/Alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authService :AuthService,private alertService:AlertService){

  }

  logout(){
    this.authService.logout();
    this.alertService.success(UIConstant.LOGOUT);
  }

}
