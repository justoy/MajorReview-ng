import {Component, Input, OnInit} from '@angular/core';
import {ReviewInterface} from "../data/ReviewInterface";

@Component({
    selector: 'app-review-detail',
    templateUrl: './review-detail.component.html',
    styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
    @Input() review: ReviewInterface;

    constructor() {
    }

    ngOnInit(): void {
    }

}
