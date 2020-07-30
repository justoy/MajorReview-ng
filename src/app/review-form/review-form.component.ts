import {Component, Input, OnInit} from '@angular/core';
import {ReviewsService} from "../reviews.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
    reviewForm: FormGroup;
    school: string;
    major: string;

    constructor(private reviewsService: ReviewsService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
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
        this.route.paramMap.subscribe(params => {
            this.school = params.get('school') || environment.default_school;
            this.major = params.get('major') || environment.default_major;
        });
    }

    onSubmit() {
        console.log(`values are ${JSON.stringify(this.reviewForm.value)}`);
        this.reviewsService.addReview(this.school, this.major, this.reviewForm.value)
            .subscribe(res => console.log("post res is ", res));
    }

}
