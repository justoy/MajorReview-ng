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
    formGroup: FormGroup;
    schoolControl: FormControl;
    majorControl: FormControl;
    filteredSchools: Observable<string[]>;
    filteredMajors: Observable<string[]>;

    constructor(private formBuilder: FormBuilder, private reviewsService: ReviewsService) {
        this.schools = SCHOOLS;
        this.majors = MAJORS;
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

    private filter(value: string, allValues: string[]): string[] {
        return allValues.filter(option => option.includes(value));
    }
}
