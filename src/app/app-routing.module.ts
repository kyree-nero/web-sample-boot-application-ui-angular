import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesComponent } from './samples/samples.component';
import { SummaryComponent } from './summary/summary.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
                        //{ path: '', redirectTo: '/summary', pathMatch: 'full' },
                        { path: 'samples', component: SamplesComponent },
                        { path: 'summary', component: SummaryComponent }
                 ];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes) 
  ],
  declarations: []
})
export class AppRoutingModule { 
    
    
}
