import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}


  success(msg:string){
    this._snackBar.open(msg, "OK",{
      horizontalPosition:'right',
      verticalPosition:'bottom',
      duration: 10000,
     });
  }

  
  warning(msg:string,action:string){
    this._snackBar.open(msg,action ,{
      horizontalPosition:'right',
      verticalPosition:'bottom',
      duration: 5000
     });
  }
  
}
