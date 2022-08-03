import { HttpClient } from '@angular/common/http';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
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
  finalResult: any;
  sampleForm!: FormGroup;
  selectedForm: any;
  formId: any;
  apiName: any;
  status = false;
  filteredOptions: any;
  filteredOptions1: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private shared: SharedService) {
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
          if (f.required) {
            group[f.title] = new FormControl(f.title || '', [
              Validators.required,
            ]);
          }
          else {
            group[f.title] = new FormControl();
          }
        } else if (f.type == 'EDIT_TEXT_PHONE') {
          if (f.required) {
            group[f.title] = new FormControl(f.title || '', [
              Validators.required,
            ]);
          }
          else {
            group[f.title] = new FormControl();
          }

        } else if (f.type == 'AUTOCOMPLETE') {
          if (f.required) {
            group[f.title] = new FormControl(f.title || '', [
              Validators.required,
            ]);
          }
          else {
            group[f.title] = new FormControl();
          }
        } else if (f.type == 'API_AUTOCOMPLETE') {
          if (f.required) {
            group[f.title] = new FormControl(f.title || '', [
              Validators.required,
            ]);
          }
          else {
            group[f.title] = new FormControl();
          }
        } else if (f.type == 'DROPDOWN') {
          if (f.required) {
            group[f.title] = new FormControl(f.title || '', [
              Validators.required,
            ]);
          }
          else {
            group[f.title] = new FormControl();
          }
        } else if (f.type == 'RADIO') {
          if (f.required) {
            group[f.title] = new FormControl(false, Validators.required);
          }
          else {
            group[f.title] = new FormControl();
          }
          
        } else if (f.type == 'CHECKBOX') {
          for (var w of f.widgetData) {
            group[w.title] = new FormControl(Validators.required);
          }
        } else if (f.type == 'DATE_PICKER') {
          if (f.required) {
            group[f.title] = new FormControl(f.title || '', [
              Validators.required,
            ]);
          }
          else {
            group[f.title] = new FormControl();
          }
        }
      }
    }
    this.submitForm = new FormGroup(group)
  }

  getFormList() {
    this.http.get("https://c527-103-208-69-65.in.ngrok.io/dynamicform/getAll").subscribe((res) => {
      this.formList = res;
    })
  }

  getSelectedForm() {
    this.http.get("https://c527-103-208-69-65.in.ngrok.io/dynamicform/get?id=" + "62ea51f4943bb31030332b10").subscribe((res) => {
      this.formData1 = res;
      this.formData = this.formData1.field;
      this.formValidation();
    })

  }

  filterChange(e: any, title: any) {
    for (var list of this.formData) {
      for (var f of list.childField) {
        if (f.title === title) {
          this.apiName = f.api;
        }
      }
    }
    this.http.get("https://c527-103-208-69-65.in.ngrok.io/api/autocomplete?api=" + this.apiName + "&prefix=" + e.target.value).subscribe((res) => {
      this.filteredOptions1 = res;
      this.filteredOptions = this.filteredOptions1.data;
    })
  }

  selected(e: any) {
    this.filteredOptions = null;
    console.log(e.option.value)
  }

  onSubmit() {

    this.result = this.submitForm.value;
    this.submitFormData();
    this.getControls();
    this.result1 = this.sampleForm.value;
    this.finalResult = this.result1.field
    console.log(this.result1)
    this.postSubmitForm();
  }

  postSubmitForm() {

    for (var list of this.finalResult) {
      for (var f of list.childField) {
        if (f.enteredValue == "" || f.enteredValue == null) {
          if (f.required) {
            alert("Please Enter Value of " + f.title);
          }
        }
      }
    }

    if (this.submitForm.valid) {
      this.http.post<any>("https://c527-103-208-69-65.in.ngrok.io/forms/submit", this.result1).subscribe((res) => {
        console.log(res);
      })

      this.router.navigate(['formSubmit'])
    }
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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

        if (f.type == 'API_AUTOCOMPLETE') {
          group1["checked"] = new FormControl("" || true, [Validators.required,]);
          group1["value"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["type"] = new FormControl("" || f.type, [Validators.required,]);
          group1["title"] = new FormControl("" || f.title, [Validators.required,]);
          group1["name"] = new FormControl("" || f.name, [Validators.required,]);
          group1["enteredValue"] = new FormControl("" || this.result[f.title], [Validators.required,]);
          group1["row"] = new FormControl("" || true, [Validators.required,]);
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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
          group1["required"] = new FormControl("" || f.required, [Validators.required,]);
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

