import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesComponent } from './samples/samples.component';
import { SummaryComponent } from './summary/summary.component';
import { RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [
                        { path: '', redirectTo: '/samples', pathMatch: 'full' },
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
