import {Component, Input, OnInit} from '@angular/core';
import {ReviewItem} from "../data/ReviewInterface";

@Component({
    selector: 'app-review-detail',
    templateUrl: './review-detail.component.html',
    styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
    @Input() review: ReviewItem;

    constructor() {
    }

    ngOnInit(): void {
    }

    toLocalDate(timestamp: number) {
        return new Date(timestamp).toLocaleDateString();
    }
}
