import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormFieldComponent } from './review-form-field.component';

describe('ReviewFormFieldComponent', () => {
  let component: ReviewFormFieldComponent;
  let fixture: ComponentFixture<ReviewFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
