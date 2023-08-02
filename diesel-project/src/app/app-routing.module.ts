import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CreateClaimComponent } from './components/create-claim/create-claim.component';
import { ClaimListComponent } from './components/claim-list/claim-list.component';
import { ClaimDetailComponent } from './components/claim-detail/claim-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'create-claim', component: CreateClaimComponent },
  { path: 'claim-list', component: ClaimListComponent },
  { path: 'claim-detail', component: ClaimDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // This line ensures that the base URL redirects to the Login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
