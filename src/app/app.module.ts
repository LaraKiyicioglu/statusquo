import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import {RouterModule} from "@angular/router";
// import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

 import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ResponsiveHeaderComponent } from './responsive-header/responsive-header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GoalsComponent } from './goals/goals.component';
import {MatCardModule} from "@angular/material/card";







@NgModule({
  declarations: [
    AppComponent,
    ResponsiveHeaderComponent,
    GoalsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // RouterModule,
    //LayoutModule,
    MatToolbarModule,
    MatButtonModule,

    // MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    // MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
