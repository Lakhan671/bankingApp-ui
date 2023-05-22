import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { UIConstant } from 'src/app/common/ui.constant';
import { ApiResponse } from 'src/app/model/ResponseData';
import { Transaction } from 'src/app/model/Transaction';
import { User } from 'src/app/model/Users';
import { AlertService } from 'src/app/services/Alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionsService } from 'src/app/services/transactions.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  userDetails: User | any;
  pageNo: number = 0;
  nextPageOff:boolean=false;
  constructor(private transactionsService: TransactionsService, private userService: AuthService, private alertService: AlertService) {

  }
  data = { "customerId": "", "page": "0", "size": "10" };
  transaction: Transaction[] = [];
  getTransactionHistory() {
    this.data['customerId'] = this.userDetails.customerId;
    this.data['page'] = this.pageNo + '';
    this.transactionsService.getTransactionByPages(this.data).subscribe(data => {
      this.transaction = <Transaction[]>data;
       if(this.transaction.length<10){
       this.nextPageOff=true;
       }else{
        this.nextPageOff=false;
       }

        
    })
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      let userData = <ApiResponse>data;
      this.userDetails = userData.data;
      this.userService.setUserData(userData.data)
      this.getTransactionHistory();

    })
  }
  previous() {
    if (this.pageNo == 0) {
      this.alertService.warning(UIConstant.NO_TRANSACTION_PREVIOUS, UIConstant.NO);
      return;
    }
    this.pageNo--;
    this.getTransactionHistory();

  }
  nextPage() {
    if(this.nextPageOff){
      this.alertService.warning(UIConstant.NO_TRANSACTION_NEXT, UIConstant.NO);
      return;
    }
    this.pageNo++;
    this.getTransactionHistory();

  }
  ngOnInit() {
    this.getUser();

  }

}