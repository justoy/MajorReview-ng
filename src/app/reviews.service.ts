import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {


    constructor(private http: HttpClient) {
    }

    getReviews(school: string, major: string) {
        const params = {
            school: school,
            major: major,
        }

        return this.http.get(environment.review_uri, {
            params: params,
        })
    }

    addReview(school: string, major: string, review: any) {

    }

}
