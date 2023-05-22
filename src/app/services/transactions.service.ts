import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getTransactionByPages(data:any) {
  return this.http.post(this.baseUrl + '/api/transaction/pages/v1',data);
}

addTransaction(data: any) {
  return this.http.post(this.baseUrl + '/api/transaction/save/v1',data);
}
}
