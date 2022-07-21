import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

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
  sendForm!: FormGroup;
  widgetDataForm!: FormGroup;
  result: any;
  result1: any;
  sampleForm!: FormGroup;
  selectedForm: any;
  formId:any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router,private shared: SharedService) {
    this.getFormList();
  }

  ngOnInit(): void {
    this.getFormList();
    this.formId = this.shared.getNextFormId();
    this.getSelectedForm();
    this.submitForm = this.formBuilder.group({});
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
          group[f.title] = new FormControl(false, Validators.required);
        } else if (f.type == 'CHECKBOX') {
          for (var w of f.widgetData) {
            group[w.title] = new FormControl(false, Validators.required);
          }
        } else if (f.type == 'DATE_PICKER') {
          group[f.title] = new FormControl(f.title || '', [
            Validators.required,
          ]);
        }
      }
    }
    this.submitForm = new FormGroup(group)
  }

  getFormList() {
    this.http.get("https://9c1a-210-16-95-127.in.ngrok.io/dynamicform/getAll").subscribe((res) => {
      this.formList = res;
    })
  }

  getSelectedForm() {
    this.http.get("https://9c1a-210-16-95-127.in.ngrok.io/dynamicform/get?id=" + this.formId).subscribe((res) => {
      this.formData1 = res;
      this.formData = this.formData1.field;
      this.formValidation();
    })
  }

  onSubmit() {
    this.result = this.submitForm.value;
    this.submitFormData();
    this.getControls();
    this.result1 = this.sampleForm.value;
    this.postSubmitForm();
  }

  postSubmitForm() {
    this.http.post<any>("https://9c1a-210-16-95-127.in.ngrok.io/forms/submit", this.result1).subscribe((res) => {
    })
    this.router.navigate(['formSubmit'])
  }

  submitFormData() {
    for (var f of this.formList) {
      if (f._id === this.formId) {
        this.selectedForm = f.name;
      }
    }
    this.sampleForm = this.formBuilder.group({
      formName: this.selectedForm,
      status: "ENABLED",
      submittedBy: "Pooja Katurde",
      field: this.formBuilder.array([])
    });
  }

  field(): FormArray {
    return this.sampleForm.get('field') as FormArray;
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      row: true,
      childField: this.formBuilder.array([]),
      name: "",
      type: "ROW_TYPE",
      title: "",
      minLength: 0,
      maxLength: 0,
      value: null,
      enteredValue: null,
      widgetData: this.formBuilder.array([]),
      checked: false
    });
  }

  childField(formIndex: number): FormArray {
    return this.field()
      .at(formIndex)
      .get('childField') as FormArray;
  }

  getControls() {
    var i = 0;
    const group1: any = {};
    const group2: any = {};
    for (var list of this.formData) {
      this.field().push(this.newForm());
      for (var f of list.childField) {
        if (f.type == 'EDIT_TEXT') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
        }

        if (f.type == 'EDIT_TEXT_PHONE') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
        }

        if (f.type == 'DROPDOWN') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
          for (var w of f.widgetData) {
            group2["title"] = new FormControl("" || w.title, [Validators.required,]);
            group2["value"] = new FormControl("" || w.value, [Validators.required,]);
            if (w.title == this.result[f.title]) {
              group2["selected"] = new FormControl("" || true, [Validators.required,]);
            }
            else {
              group2["selected"] = new FormControl("" || w.selected, [Validators.required,]);
            }
            this.widgetDataForm = new FormGroup(group2)
            group1["widgetData"].push(this.widgetDataForm)
          }
        }

        if (f.type == 'AUTOCOMPLETE') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
          for (var w of f.widgetData) {
            group2["title"] = new FormControl("" || w.title, [Validators.required,]);
            group2["value"] = new FormControl("" || w.value, [Validators.required,])
            if (w.title == this.result[f.title]) {
              group2["selected"] = new FormControl("" || true, [Validators.required,]);
            }
            else {
              group2["selected"] = new FormControl("" || w.selected, [Validators.required,]);
            }
            this.widgetDataForm = new FormGroup(group2)
            group1["widgetData"].push(this.widgetDataForm)
          }
        }

        if (f.type == 'DATE_PICKER') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || new Date(this.result[f.title]), [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
        }

        if (f.type == 'RADIO') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
          for (var w of f.widgetData) {
            group2["title"] = new FormControl("" || w.title, [Validators.required,]);
            group2["value"] = new FormControl("" || w.value, [Validators.required,])
            if (w.title == this.result[f.title]) {
              group2["selected"] = new FormControl("" || true, [Validators.required,]);
            }
            else {
              group2["selected"] = new FormControl("" || w.selected, [Validators.required,]);
            }
            this.widgetDataForm = new FormGroup(group2)
            group1["widgetData"].push(this.widgetDataForm)
          }
        }

        if (f.type == 'CHECKBOX') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || null, [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || null, [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["minLength"] = new FormControl("" || f.minLength, [Validators.required,]);
          group1["maxLength"] = new FormControl("" || f.maxLength, [Validators.required,]);
          group1["childField"] = new FormArray([]);
          group1["widgetData"] = new FormArray([]);
          for (var w of f.widgetData) {
            group2["title"] = new FormControl("" || w.title, [Validators.required,]);
            group2["value"] = new FormControl("" || w.value, [Validators.required,])
            if (this.result[w.title] == true) {
              group2["selected"] = new FormControl("" || true, [Validators.required,]);
            }
            else {
              group2["selected"] = new FormControl("" || w.selected, [Validators.required,]);
            }
            this.widgetDataForm = new FormGroup(group2)
            group1["widgetData"].push(this.widgetDataForm)
          }
        }
        this.sendForm = new FormGroup(group1)
        this.childField(i).push(this.sendForm);
      }
      i++;
    }
  }
}

