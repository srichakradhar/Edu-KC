import { AccountAuthGuard } from "./account/guards/account-auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  { path: "", redirectTo: "account", pathMatch: "full" },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
    // canActivate: [AccountAuthGuard],
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./programs/programs.module").then((m) => m.ProgramsPageModule),
    // canActivate: [AccountAuthGuard],
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountPageModule),
  },
  {
    path: 'actions',
    loadChildren: () => import('./actions/actions.module').then( m => m.ActionsPageModule)
  },
  {
    path: 'community-member',
    loadChildren: () => import('./community-member/community-member.module').then( m => m.CommunityMemberPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
