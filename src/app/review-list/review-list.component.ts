import {Component, OnInit} from '@angular/core';
import {ReviewsService} from "../reviews.service";
import {ReviewInterface} from "../data/ReviewInterface";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
    reviews: Observable<ReviewInterface[]>;

    constructor(private reviewService: ReviewsService, private route: ActivatedRoute) {
        this.reviews = this.reviewService.currentReviews;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const school = params.get('school') || environment.default_school;
            const major = params.get('major') || environment.default_major;
            this.reviewService.fetchReviews(school, major);
        });
    }

}
