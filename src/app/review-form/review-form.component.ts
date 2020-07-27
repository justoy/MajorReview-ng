import {Component, Input, OnInit} from '@angular/core';
import {ReviewsService} from "../reviews.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
    reviewForm: FormGroup;
    @Input() school: string;
    @Input() major: string;

    constructor(private reviewsService: ReviewsService, private formBuilder: FormBuilder) {
        this.reviewForm = formBuilder.group({
            author: new FormControl('Anonymous', [
                Validators.required,
                Validators.maxLength(48),
            ]),
            career: new FormControl('', [
                Validators.required,
                Validators.maxLength(2000),
            ]),
            academy: new FormControl('', [
                Validators.required,
                Validators.maxLength(2000),
            ]),
            courses: new FormControl('', [
                Validators.required,
                Validators.maxLength(2000),
            ]),
            major: new FormControl('', [
                Validators.required,
                Validators.maxLength(2000),
            ])
        })
    }

    ngOnInit(): void {
    }

    onSubmit() {
        console.log(`values are ${JSON.stringify(this.reviewForm.value)}`);
        this.reviewsService.addReview(this.school, this.major, this.reviewForm.value)
            .subscribe(res => console.log("post res is ", res));
    }

}
