import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './404.component';

/** 
 * Configure top level routes for Application
 *  path(''): this is the root for the application:
 *    DashboardModule contains all application UI logic
 *  path('**'): for all routes not defined by DashboardModule and this router,
 *    display PageNotFoundComponent's template in AppComponents <router-outlet>
 *    block
 */
export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: '**', component: PageNotFoundComponent }
];
  
// configure the routes and export
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}