import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-submit-form',
  templateUrl: './view-submit-form.component.html',
  styleUrls: ['./view-submit-form.component.scss']
})
export class ViewSubmitFormComponent implements OnInit {

  formRenderData: any;

  constructor(private http: HttpClient, private shared: SharedService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.formRenderData = this.shared.getPreviewFormData();
    console.log(this.formRenderData)
  }

}
