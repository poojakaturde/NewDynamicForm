import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  formPreviewData: any;
  response: any;
  formId: any;
  constructor() { }

  sendPreviewFormData(data: any) {
    this.formPreviewData = data;
  }

  getPreviewFormData() {
    return this.formPreviewData;
  }

  sendResponse(data: any) {
    this.response = data;
  }

  getResponseData() {
    return this.response;
  }

  getNextFormId() {
    return this.formId;
  }

  sendNextFormId(data: any) {
    this.formId = data;
  }
}
