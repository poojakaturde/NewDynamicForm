import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-generate',
  templateUrl: './form-generate.component.html',
  styleUrls: ['./form-generate.component.scss']
})
export class FormGenerateComponent implements OnInit {

  formList: any;
  formData: any;
  formData1: any;
  submitForm!: FormGroup;
  sampleForm!: FormGroup;
  selectedForm: any;
  isValid = false;
  result: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getFormList();
    this.submitForm = this.formBuilder.group({})
    this.sampleForm = this.formBuilder.group({
      formName: "",
      field: this.formBuilder.array([])
    });
  }

  field(): FormArray {
    return this.sampleForm.get('field') as FormArray;
  }

  formValidation() {
    const group: any = {};
    for (var list of this.formData) {
      for (var f of list.childField) {
        if (f.type == 'EDIT_TEXT') {
          group[f.title] = new FormControl(f.title || '', [
            Validators.required,
          ]);
        } else if (f.type == 'EDIT_TEXT_PHONE') {
          group[f.title] = new FormControl(f.title || '', Validators.required);
        } else if (f.type == 'AUTOCOMPLETE') {
          group[f.title] = new FormControl(f.title || '', Validators.required);
        } else if (f.type == 'DROPDOWN') {
          group[f.title] = new FormControl(f.title || '', Validators.required);
        } else if (f.type == 'RADIO') {
          group[f.title] = new FormControl(false, null);
        } else if (f.type == 'CHECKBOX') {
          group[f.title] = new FormControl(f.title || '', Validators.required);
        } else if (f.type == 'DATE_PICKER') {
          group[f.title] = new FormControl(f.title || '', [
            Validators.required,
          ]);
        }
      }
    }
    this.submitForm = new FormGroup(group)
    this.field().push(this.submitForm)
  }

  getFormList() {
    this.http.get("http://intellidocs.geekiobit.in:8080/dynamicform/getAll").subscribe((res) => {
      this.formList = res;
    })
  }

  generateForm(name: any) {
    this.selectedForm = name.value;
    this.getSelectedForm();

  }

  getSelectedForm() {
    this.http.get("http://intellidocs.geekiobit.in:8080/dynamicform/get?name=" + this.selectedForm).subscribe((res) => {
      this.formData1 = res;
      this.formData = this.formData1.field
      this.isValid = true;
      this.formValidation();
    })


  }

  onSubmit() {
    console.log(this.sampleForm.value);
  }

}
