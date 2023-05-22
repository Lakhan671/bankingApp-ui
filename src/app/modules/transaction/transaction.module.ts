import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatFormFieldModule,FormsModule,ReactiveFormsModule
  ],
  exports: [
    TransactionComponent
  ],
  declarations: [
    TransactionComponent
  ],
  providers: [
  ],
})
export class AboutModule { }