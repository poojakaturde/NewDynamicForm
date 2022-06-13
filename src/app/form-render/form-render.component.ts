import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-form-render',
  templateUrl: './form-render.component.html',
  styleUrls: ['./form-render.component.scss']
})
export class FormRenderComponent implements OnInit {

  formRenderData:any;
  constructor(private http: HttpClient,private shared: SharedService) { }

  ngOnInit(): void {
      // this.http.get<any>("http://localhost:3000/posts").subscribe((res) => {
      //   this.formRenderData=res[0];
      //   console.log(this.formRenderData)
      // })

      this.formRenderData=this.shared.getPreviewFormData();
      console.log(this.formRenderData)
  }

}
