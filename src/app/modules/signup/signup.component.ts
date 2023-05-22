import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UIConstant } from 'src/app/common/ui.constant';
import { ApiResponse } from 'src/app/model/ResponseData';
import { AlertService } from 'src/app/services/Alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private altertService:AlertService,private router:Router) {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(100),Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]
      ]
    });
  }

  ngOnInit() {
    this.registerForm.reset();

  }
  onSubmit() {
    if(this.registerForm.valid){
      let signupData=this.registerForm.value;  
      this.authService.register(signupData).subscribe(data=>{
        let reponsedata=<ApiResponse>data;
        this.altertService.success(reponsedata.msg+ UIConstant.EMAIL_PASSWORD);
        this.registerForm.reset();
        this.router.navigate(['/']);
      });
   
    }

  }
}