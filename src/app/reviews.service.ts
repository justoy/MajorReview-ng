import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable} from "rxjs";
import {ReviewInterface} from "./data/ReviewInterface";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    private reviewSource: BehaviorSubject<ReviewInterface[]>;
    currentReviews: Observable<ReviewInterface[]>


    constructor(private http: HttpClient) {
    }

    initReviews(): Promise<any> {
        const params = {
            school: environment.default_school,
            major: environment.default_major,
        }

        return this.http.get<ReviewInterface[]>(environment.review_uri, {params: params,})
            .toPromise()
            .then(reviews => {
                    console.debug(`reviews is ${JSON.stringify(reviews)}, type is ${typeof reviews}`);
                    this.reviewSource = new BehaviorSubject<ReviewInterface[]>(reviews);
                    this.currentReviews = this.reviewSource.asObservable();
                }
            )
    }

    fetchReviews(school: string, major: string) {
        const params = {
            school: school,
            major: major,
        }

        this.http.get<ReviewInterface[]>(environment.review_uri, {
            params: params,
        }).subscribe(reviews => {
                console.debug(`reviews is ${JSON.stringify(reviews)}, type is ${typeof reviews}`);
                this.reviewSource.next(reviews);
            }
        )
    }

    addReview(school: string, major: string, review: ReviewInterface): Observable<any> {
        const params = {
            school: school,
            major: major,
        }
        return this.http.post<ReviewInterface>(environment.review_uri, review, {params})
    }

}
