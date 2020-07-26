import {Component, OnInit} from '@angular/core';
import {ReviewsService} from "../reviews.service";
import {ReviewInterface} from "../data/ReviewInterface";
import {Observable} from "rxjs";

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
    reviews: Observable<ReviewInterface[]>;

    constructor(private reviewService: ReviewsService) {
    }

    ngOnInit(): void {
        this.reviews = this.reviewService.currentReviews;
    }

}
