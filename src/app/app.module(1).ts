import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { PageNotFoundComponent } from './404.component';

//import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    RoutingModule
    //StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [ Title ],
  bootstrap: [AppComponent]
})
export class AppModule { }
