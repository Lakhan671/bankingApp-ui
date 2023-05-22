import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,FormsModule,ReactiveFormsModule,
    MatNativeDateModule 
  ],
  exports: [
    SignupComponent
  ],
  declarations: [
    SignupComponent
  ],
  providers: [
  ],
})
export class SignupModule { }