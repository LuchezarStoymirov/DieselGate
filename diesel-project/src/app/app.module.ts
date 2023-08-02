import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  DxFormModule,
  DxButtonModule,
  DxBoxModule,
  DxListModule,
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CreateClaimComponent } from './components/create-claim/create-claim.component';
import { ClaimListComponent } from './components/claim-list/claim-list.component';
import { ClaimDetailComponent } from './components/claim-detail/claim-detail.component';
import { AppRoutingModule } from './app-routing.module';

import { ClaimService } from './Services/claim.service';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    CreateClaimComponent,
    ClaimListComponent,
    ClaimDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DxFormModule,
    DxButtonModule,
    DxBoxModule,
    DxListModule,
  ],
  providers: [ClaimService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
