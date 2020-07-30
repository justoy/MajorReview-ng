import {Component, Input, OnInit} from '@angular/core';
import {ReviewsService} from "../reviews.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
    reviewForm: FormGroup;
    school: string;
    major: string;

    constructor(private reviewsService: ReviewsService,
                private router: Router,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
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
        this.activatedRoute.paramMap.subscribe(params => {
            this.school = params.get('school') || environment.default_school;
            this.major = params.get('major') || environment.default_major;
        });
    }

    onSubmit() {
        console.debug(`values are ${JSON.stringify(this.reviewForm.value)}`);
        this.reviewsService.addReview(this.school, this.major, this.reviewForm.value)
            .subscribe(res => {
                console.debug("post res is ", res);
                this.redirectToReviews(this.school, this.major);
            });
    }

    redirectToReviews(school: string, major: string) {
        this.router.navigate(['/reviews', 'school', school, 'major', major]);
    }
}
