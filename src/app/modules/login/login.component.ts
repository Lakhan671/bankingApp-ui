import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UIConstant } from 'src/app/common/ui.constant';
import { AlertService } from 'src/app/services/Alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertService: AlertService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'password': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  login(data: any) {
    this.authService.login(data).subscribe();
  }
  ngOnInit() {
    this.loginForm.reset();

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    } else {
      this.alertService.warning(UIConstant.INVALID_LOGIN,UIConstant.ERROR)
    }
  }
}

