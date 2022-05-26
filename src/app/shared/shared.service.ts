import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  formPreviewData : any;

  constructor() { }

  sendPreviewFormData(data:any){
    this.formPreviewData=data;
  }

  getPreviewFormData(){
    return this.formPreviewData;
  }
}
