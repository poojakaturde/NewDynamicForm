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
  display = false;
  result: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        formname: [null],
        controlls: this.fb.array([]),
      }
    );
  }
  
  controlls(): FormArray {
    return this.form.get('controlls') as FormArray;
  }

  newForm(): FormGroup {
    return this.fb.group({
      valueType: '',
      type: '',
      title: '',
      row: false,
      minLength: '',
      maxLength: '',
      value:null,
      enteredValue:null,
      widgetData: this.fb.array([])
    });
  }

  addForm() {
    this.controlls().push(this.newForm());
    this.display=false;
  }

  removeForm(formIndex: number) {
    this.controlls().removeAt(formIndex);
  }

  formWidgetData(formIndex: number): FormArray {
    return this.controlls()
      .at(formIndex)
      .get('widgetData') as FormArray;
  }

  newWidgetData(): FormGroup {
    return this.fb.group({
      optionTitle: '',
      optionName: '',
      optionValue: '',
    });
  }

  addFormWidgetData(formIndex: number) {
    this.formWidgetData(formIndex).push(this.newWidgetData());
  }

  removeFormWidgetData(formIndex: number, widgetDataIndex: number) {
    this.formWidgetData(formIndex).removeAt(widgetDataIndex);
  }

  onSubmit() {
    console.log(this.form.value);
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
    this.shared.sendPreviewFormData(this.result);
    this.router.navigate(['form'])
  }

  openModal(formIndex: any) {
    this.display = true;
  }

  // closeModal(formIndex: any) {
  //   this.display = "none";
  // }
}
