import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-submit-eligibility',
  templateUrl: './submit-eligibility.component.html',
  styleUrls: ['./submit-eligibility.component.scss']
})
export class SubmitEligibilityComponent implements OnInit {

  formData: any;
  eligibilityForm: any;
  eligibilityForm1: any;
  eligibilityFormId: any;
  submitEligibilityForm!: FormGroup;
  sendEligibilityForm!: FormGroup;
  result: any;
  result1: any;
  nextId: any;
  eligibleForm!: FormGroup;
  responseData: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.getFormList();
    this.submitEligibilityForm = this.formBuilder.group({});
  }

  getFormList() {
    this.http.get("https://cda1-210-16-95-127.in.ngrok.io/dynamicform/getAll").subscribe((res) => {
      this.formData = res;
      for (var f of this.formData) {
        if (f.name == "Eligibility Form") {
          this.eligibilityFormId = f._id;
        }
      }
      this.getEligibilityForm();
    })
  }

  getEligibilityForm() {
    this.http.get("https://cda1-210-16-95-127.in.ngrok.io/dynamicform/get?id=" + this.eligibilityFormId).subscribe((res) => {
      this.eligibilityForm1 = res;
      console.log(this.eligibilityForm1)
      this.eligibilityForm = this.eligibilityForm1.field;
      this.formValidation();
    })
    
  }

  formValidation() {
    const group: any = {};
    for (var list of this.eligibilityForm1.field) {
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
    this.submitEligibilityForm = new FormGroup(group)
  }

  onSubmit() {
    this.result = this.submitEligibilityForm.value;
    this.submitEligibilityFormData();
    this.getControls();
    this.result1 = this.eligibleForm.value;
    this.postSubmitEligibilityForm();
  }

  submitEligibilityFormData() {
    this.eligibleForm = this.formBuilder.group({
      formName: this.eligibilityForm1.name,
      eligibility: this.eligibilityForm1.eligibility,
      nextFormId: this.eligibilityForm1.nextFormId,
      status: "ENABLED",
      submittedBy: "Pooja Katurde",
      field: this.formBuilder.array([])
    });
  }

  field(): FormArray {
    return this.eligibleForm.get('field') as FormArray;
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
    for (var list of this.eligibilityForm) {
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

        this.sendEligibilityForm = new FormGroup(group1)
        this.childField(i).push(this.sendEligibilityForm);
      }
      i++;
    }
  }

  postSubmitEligibilityForm() {
    this.shared.sendNextFormId(this.result1.nextFormId);
    this.http.post<any>("https://cda1-210-16-95-127.in.ngrok.io/forms/submit", this.result1).subscribe((res) => {
      this.responseData = res;
      if (this.responseData.errorMessages == null) {
        this.router.navigate(['formGenerate']);
      }
      else {
        this.shared.sendResponse(this.responseData);
        this.router.navigate(['notEligible']);
      }
    })
    this.submitEligibilityForm.reset();
  }
}
