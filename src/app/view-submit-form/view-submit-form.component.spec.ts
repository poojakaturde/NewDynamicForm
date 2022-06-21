import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmitFormComponent } from './view-submit-form.component';

describe('ViewSubmitFormComponent', () => {
  let component: ViewSubmitFormComponent;
  let fixture: ComponentFixture<ViewSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
