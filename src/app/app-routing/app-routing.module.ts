import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReviewListComponent} from "../review-list/review-list.component";
import {ReviewFormComponent} from "../review-form/review-form.component";

const routes: Routes = [{path: '', component: ReviewListComponent},
    {path: 'reviews/school/:school/major/:major', component: ReviewListComponent},
    {path: 'write-review/school/:school/major/:major', component: ReviewFormComponent},];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor() {
    }
}
