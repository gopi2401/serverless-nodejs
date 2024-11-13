import { Routes } from '@angular/router';
import { articlesComponent } from './articles/articles.component';
import { installationComponent } from './articles/installation/installation.component';
import { CoreComponent } from './articles/core/core.component';
import { ContributingComponent } from './articles/contributing/contributing.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' }, //default route
    {
        path: '', component: articlesComponent,
    },
    {
        path: "installation",
        component: installationComponent
    },
    {
        path: "core-concepts",
        component: CoreComponent
    },
    {
        path: "contributing",
        component: ContributingComponent
    }
];
