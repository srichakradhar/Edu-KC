import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProgramsPage } from "./programs.page";
import { CommunityComponent } from './community/community.component';

const routes: Routes = [
  {
    path: "",
    component: ProgramsPage,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule),
        children: [
          {
            path: '',
            loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule),
          },
          {
            path: ':id/programs',
            loadChildren: () => import('./../programs/search/search.module').then( m => m.SearchPageModule),
            children: [
              {
                path: '',
                loadChildren: () => import('./../programs/search/search.module').then( m => m.SearchPageModule),
              },
              {
                path: ':id',
                loadChildren: () => import('./../programs/search/program-detail/program-detail.module').then( m => m.ProgramDetailPageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'starred',
        loadChildren: () => import('./shortlist/shortlist.module').then( m => m.ShortlistPageModule)
      },
      {
        path: 'enrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then( m => m.EnrollmentPageModule)
      },
      {
        path: 'community',
        component: CommunityComponent
      },
      {
        path: "",
        redirectTo: "/categories/landing",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/categories/landing",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsPageRoutingModule {}
