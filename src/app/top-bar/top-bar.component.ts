import {Component, OnInit} from '@angular/core';
import {SCHOOLS} from "../../assets/schools";
import {MAJORS} from "../../assets/majors";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ReviewsService} from "../reviews.service";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
    schools;
    majors;
    current_major: string;
    current_school: string;
    formGroup: FormGroup;
    schoolControl: FormControl;
    majorControl: FormControl;
    filteredSchools: Observable<string[]>;
    filteredMajors: Observable<string[]>;

    constructor(private formBuilder: FormBuilder, private reviewsService: ReviewsService) {
        this.schools = SCHOOLS;
        this.majors = MAJORS;
        this.current_major = environment.default_major;
        this.current_school = environment.default_school;
        this.schoolControl = new FormControl(environment.default_school, [Validators.required]);
        this.majorControl = new FormControl(environment.default_major, [Validators.required]);
        this.formGroup = formBuilder.group(this.majorControl, this.schoolControl);
    }

    ngOnInit(): void {
        this.filteredMajors = this.majorControl.valueChanges
            .pipe(
                startWith(''),
                map(major => this.filter(major, this.majors))
            );

        this.filteredSchools = this.schoolControl.valueChanges
            .pipe(
                startWith(''),
                map(school => this.filter(school, this.schools))
            );
    }

    onSubmit() {
        this.current_major = this.majorControl.value;
        this.current_school = this.schoolControl.value
        console.debug(`school is ${this.current_school}, major is ${this.current_major}`);
        this.reviewsService.fetchReviews(this.current_school, this.current_major);
    }

    private filter(value: string, allValues: string[]): string[] {
        return allValues.filter(option => option.includes(value));
    }
}
