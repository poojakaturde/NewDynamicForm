import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form!: FormGroup;
  display="none";
  result:any;
  show="none";
  options = ["one", "two", "three"];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
      typename: '',
      labelname: '',
      check: '',
      minlength: '',
      maxlength: '',
      advancement: this.fb.array([])
    });
  }

  addForm() {
    this.controlls().push(this.newForm());
  }

  removeForm(formIndex: number) {
    this.controlls().removeAt(formIndex);
  }

  formAdvancement(formIndex: number): FormArray {
    return this.controlls()
      .at(formIndex)
      .get('advancement') as FormArray;
  }

  newAdvancement(): FormGroup {
    return this.fb.group({
      optionTitle: '',
      optionName: '',
      optionValue: '',
    });
  }

  addFormAdvancement(formIndex: number) {
    this.formAdvancement(formIndex).push(this.newAdvancement());
  }

  removeFormAdvancement(formIndex: number, advancementIndex: number) {
    this.formAdvancement(formIndex).removeAt(advancementIndex);
  }

  onSubmit() {
    console.log(this.form.value);
  }
  onPreview(form:any){
    console.log(form.value);
    this.result=form.value;
    this.show="block";
  }

  openModal(formIndex: any) {
    this.display="block";
  }

  closeModal(formIndex: any) {
    this.display="none";
  }

  close(){
    this.show="none";
  }
}

