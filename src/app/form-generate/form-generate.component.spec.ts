import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenerateComponent } from './form-generate.component';

describe('FormGenerateComponent', () => {
  let component: FormGenerateComponent;
  let fixture: ComponentFixture<FormGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
