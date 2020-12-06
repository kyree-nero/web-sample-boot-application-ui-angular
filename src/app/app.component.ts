
import { Component , OnInit, Directive, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { SecurityService } from './security/security.service';
import {  HttpResponse, HttpHeaders } from '@angular/common/http';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 
  csrfToken = null;
  title = 'app';
  num = 1;
  grtg = 'Unassigned.  Press the button';
  
  constructor(
  		private securityService: SecurityService,
  		private componentFactoryResolver: ComponentFactoryResolver
  ) {
  	
  }

	ngOnInit(){
     console.log('On init');
    // this.postInitialSamples();
    // console.log('On init end');
	   
  } 
  
  

  
  
  getCSRF():string {
      return this.securityService.getCSRF();
      
  }

}
