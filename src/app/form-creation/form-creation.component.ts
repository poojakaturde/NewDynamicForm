import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {SharedService} from "../shared/shared.service"

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.scss']
})
export class FormCreationComponent implements OnInit {

  form!: FormGroup;
  result: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: "",
        status:"ENABLED",
        field: this.fb.array([]),
      }
    );
  }
  
  field(): FormArray {
    return this.form.get('field') as FormArray;
  }

  newForm(): FormGroup {
    return this.fb.group({
      row: true,
      childField:this.fb.array([]),
      name: "",
      type: "ROW_TYPE",
      title: "",
      minLength:0 ,
      maxLength: 0,
      value:null,
      enteredValue:null,
      widgetData: this.fb.array([]),
      checked:false
    });
  }

  addForm() {
    this.field().push(this.newForm());
  }

  removeForm(formIndex: number) {
    this.field().removeAt(formIndex);
  }

  childField(formIndex: number): FormArray {
    return this.field()
    .at(formIndex)
    .get('childField') as FormArray;
  }

  newChildField(): FormGroup {
    return this.fb.group({
      name: "",
      type: "",
      title: "",
      minLength:0 ,
      maxLength: 0,
      value:null,
      enteredValue:null,
      widgetData: this.fb.array([]),
      checked:false,
      childField:null
    });
  }

  addChildFieldData(formIndex: number) {
    this.childField(formIndex).push(this.newChildField());
  }

  removeChildFieldData(formIndex: number, childDataIndex: number) {
    this.childField(formIndex).removeAt(childDataIndex);
  }

  formWidgetData(formIndex: number,childDataIndex: number): FormArray {
    return this.childField(formIndex)
      .at(childDataIndex)
      .get('widgetData') as FormArray;
  }

  newWidgetData(): FormGroup {
    return this.fb.group({
      title: '',
      value: '',
      isSelected: false,
    });
  }

  addFormWidgetData(formIndex: number,childDataIndex: number) {
    this.formWidgetData(formIndex,childDataIndex).push(this.newWidgetData());
  }

  removeFormWidgetData(formIndex: number,childDataIndex: number, widgetDataIndex: number) {
    this.formWidgetData(formIndex,childDataIndex).removeAt(widgetDataIndex);
  }

  onSubmit() {
    this.result = this.form.value;
  }

  onSave(){
    this.http.post<any>("http://localhost:3000/posts", this.result).subscribe((res) => {
      console.log(res);
    })
    this.form.reset();
  }

  onPreview() {
    this.result = this.form.value;
    console.log(this.result);
    this.http.post<any>("https://4a1c-103-208-69-135.in.ngrok.io/dynamicform/createform", this.result).subscribe((res) => {
      console.log(res);
    })
    this.shared.sendPreviewFormData(this.result);
    this.router.navigate(['form'])
  }

}
