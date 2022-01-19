import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./auth-guard.service";
import {GoalsCreateComponent} from "./goals/goals-create/goals-create.component";
import {AnnualReviewComponent} from "./annual-review/annual-review.component";
import {BoardMemberComponent} from "./board-member/board-member.component";
import {RoleGuard} from "./role.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TeamviewComponent} from "./teamview/teamview.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: 'ziele',
    component: GoalsCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'teamview/:id',
    component: TeamviewComponent,
    canActivate: [AuthGuardService, RoleGuard]
  },
  {
    path: 'protokolle',
    component: AnnualReviewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'board/:id',
    component: BoardMemberComponent,
    canActivate: [AuthGuardService, RoleGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
