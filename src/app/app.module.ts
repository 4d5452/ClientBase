import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './404.component';

import { StreamComponent } from './stream/stream.component';
//import { StreamEffectsService } from './stream/stream.effect';
import { StreamViewComponent } from './stream/stream-view.component';
import { StreamService } from './stream/stream.service';

import { ValueComponent } from './value/value.component';
import { ValueEffectsService } from './value/value.effect';
import { ValueService } from './value/value.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    EffectsModule.forRoot([
      ValueEffectsService
    ]),
    HttpClientModule,
    RoutingModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    StreamComponent,
    StreamViewComponent,
    ValueComponent
  ],
  providers: [ 
    Title,
    StreamService,
    ValueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
