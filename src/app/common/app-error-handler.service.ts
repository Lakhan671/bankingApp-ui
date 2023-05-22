import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../services/Alert.service';
import { UIConstant } from './ui.constant';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private alertService: AlertService) {
    super();
  }

  override handleError(error: Error | HttpErrorResponse) {
    this.alertService.warning(UIConstant.ERROR_RESPONSE_UNAUTH,'ERROR');
    super.handleError(error);
  }
}
