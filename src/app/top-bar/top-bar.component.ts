import {Component, OnInit} from '@angular/core';
import {SCHOOLS} from "../../assets/schools";
import {MAJORS} from "../../assets/majors";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

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

    constructor(private formBuilder: FormBuilder) {
        this.schools = SCHOOLS;
        this.majors = MAJORS;
        this.schoolControl = new FormControl('哈尔滨工业大学', [Validators.required]);
        this.majorControl = new FormControl("焊接技术与工程", [Validators.required]);
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

    }

    private filter(value: string, allValues: string[]): string[] {
        return allValues.filter(option => option.includes(value));
    }
}
