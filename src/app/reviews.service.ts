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
            .then(reivews => {
                    console.log(`reviews is ${JSON.stringify(reivews)}, type is ${typeof reivews}`);
                    this.reviewSource = new BehaviorSubject<ReviewInterface[]>(reivews);
                    this.currentReviews = this.reviewSource.asObservable();
                }
            )
    }

    getReviews(school: string, major: string) {
        const params = {
            school: school,
            major: major,
        }

        return this.http.get<ReviewInterface[]>(environment.review_uri, {
            params: params,
        })
    }

    addReview(school: string, major: string, review: any) {

    }

}
