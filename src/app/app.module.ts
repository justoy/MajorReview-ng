import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {ReviewFormComponent} from './review-form/review-form.component';
import {ReviewListComponent} from './review-list/review-list.component';
import {ReviewDetailComponent} from './review-detail/review-detail.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {ReviewsService} from "./reviews.service";
import {ReviewFormFieldComponent} from './review-form-field/review-form-field.component';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        ReviewFormComponent,
        ReviewListComponent,
        ReviewDetailComponent,
        ReviewFormFieldComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [
        ReviewsService,
        {
            provide: APP_INITIALIZER,
            useFactory: (reviewService: ReviewsService) => () => reviewService.initReviews(),
            deps: [ReviewsService],
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
