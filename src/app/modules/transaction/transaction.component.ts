import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/model/Transaction';
import { ApiResponse } from 'src/app/model/ResponseData';
import { AlertService } from 'src/app/services/Alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/Users';
import { Router } from '@angular/router';
import { UIConstant } from 'src/app/common/ui.constant';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  selectionType: string = 'D';
  acountNo: string = '';
  balance: number = 0;

  transactionForm: FormGroup;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private transactionsService: TransactionsService,
    private router: Router
  ) {

    this.transactionForm = this.formBuilder.group({
      'amount': ['', [Validators.required, Validators.min(1)]],
      'desc': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]
    });


  }

  data = {
    "customerId": "", "desc": "",
    "transaction": "D", "deposit": "", "withdraw": "", "cb": ""
  }
  addTransaction(data: any) {
    this.transactionsService.addTransaction(data).subscribe(data => {
      let response = <ApiResponse>data;
      this.alertService.success(response.msg)
      this.router.navigate(['/home']);
    })
  }

  public switchDW(type: string): void {
    this.selectionType = type;
  }
  onSubmit() {
    if (this.transactionForm.valid) {
      let user: User = this.authService.getUserData();
      if(user.currentBalance<this.transactionForm.value['amount'] && this.selectionType == 'W'){
        this.alertService.warning(UIConstant.WITHDRAW_ERROR,UIConstant.ERROR);
        return;
     
        }
      this.data['customerId'] = user.customerId;
      this.data['desc'] = this.transactionForm.value['desc'];

      this.data['transaction'] = this.selectionType;
      if (this.selectionType == 'D') {
        this.data['deposit'] = this.transactionForm.value['amount'];

      }
      if (this.selectionType == 'W') {
        this.data['withdraw'] = this.transactionForm.value['amount'];
      }
      this.data['cb'] = user.currentBalance + '';
      this.data['customerId'] = user.customerId;
      this.addTransaction(this.data);
      this.transactionForm.reset();

    }

  }
  ngOnInit() {
    let userData = this.authService.getUserData();
    if (userData == undefined) {
      this.authService.getUser().subscribe(data => {
        let userD = <ApiResponse>data;
        let userDetails = <User>userD.data;
        this.acountNo = userDetails.bankAccountNo;
        this.balance = userDetails.currentBalance;
        this.authService.setUserData(userDetails)

      })
    }else{
      this.acountNo = userData.bankAccountNo;
      this.balance = userData.currentBalance;
    }

  }

}

