import { Component, OnInit} from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-form-render',
  templateUrl: './form-render.component.html',
  styleUrls: ['./form-render.component.scss']
})
export class FormRenderComponent implements OnInit {

  formRenderData:any;
  constructor(private shared: SharedService) { }

  ngOnInit(): void {
      this.formRenderData=this.shared.getPreviewFormData();
      console.log(this.formRenderData.field[0].childField.length)
  }

}
