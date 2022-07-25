import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eligibility-check',
  templateUrl: './eligibility-check.component.html',
  styleUrls: ['./eligibility-check.component.scss']
})
export class EligibilityCheckComponent implements OnInit {
  form!: FormGroup;
  result: any;
  formList: any;
  nextId:any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private shared: SharedService) {
    this.getFormList();
  }

  ngOnInit(): void {
    this.getFormList();
    this.form = this.fb.group(
      {
        name: "",
        status: "ENABLED",
        eligibility: false,
        nextFormId: "",
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
      childField: this.fb.array([]),
      name: "",
      type: "ROW_TYPE",
      title: "",
      minLength: 0,
      maxLength: 0,
      value: null,
      enteredValue: null,
      widgetData: this.fb.array([]),
      checked: false
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
      minLength: 0,
      maxLength: 0,
      value: null,
      enteredValue: null,
      childField: null,
      widgetData: this.fb.array([]),
      checked: false
    });
  }

  addChildFieldData(formIndex: number) {
    this.childField(formIndex).push(this.newChildField());
  }

  removeChildFieldData(formIndex: number, childDataIndex: number) {
    this.childField(formIndex).removeAt(childDataIndex);
  }

  formWidgetData(formIndex: number, childDataIndex: number): FormArray {
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

  addFormWidgetData(formIndex: number, childDataIndex: number) {
    this.formWidgetData(formIndex, childDataIndex).push(this.newWidgetData());
  }

  removeFormWidgetData(formIndex: number, childDataIndex: number, widgetDataIndex: number) {
    this.formWidgetData(formIndex, childDataIndex).removeAt(widgetDataIndex);
  }

  onSave() {
    this.result = this.form.value;
    for (var f of this.formList) {
      if (f.name === this.form.value.nextFormId) {
        this.nextId = f._id;
      }
    }
    console.log(this.result)
    this.form.controls['nextFormId'].setValue(this.nextId);
    this.http.post<any>("https://cda1-210-16-95-127.in.ngrok.io/dynamicform/createForm", this.result).subscribe((res) => {
      console.log(res);
    })
    this.router.navigate(['eligible'])
  }

  onPreview() {
    this.result = this.form.value;
    this.shared.sendPreviewFormData(this.result);
    this.router.navigate(['formPreview'])
  }

  getFormList() {
    this.http.get("https://cda1-210-16-95-127.in.ngrok.io/dynamicform/getAll").subscribe((res) => {
      this.formList = res;
    })
  }

}
