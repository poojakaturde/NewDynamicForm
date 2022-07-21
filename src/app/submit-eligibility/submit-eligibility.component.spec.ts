import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitEligibilityComponent } from './submit-eligibility.component';

describe('SubmitEligibilityComponent', () => {
  let component: SubmitEligibilityComponent;
  let fixture: ComponentFixture<SubmitEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitEligibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
