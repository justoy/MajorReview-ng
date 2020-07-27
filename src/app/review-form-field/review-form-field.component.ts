import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-review-form-field',
  templateUrl: './review-form-field.component.html',
  styleUrls: ['./review-form-field.component.css']
})
export class ReviewFormFieldComponent implements OnInit {
  @Input() reviewForm: FormGroup;
  @Input() reviewControlName: string;
  @Input() concept: string

  constructor() { }

  ngOnInit(): void {
  }

}
