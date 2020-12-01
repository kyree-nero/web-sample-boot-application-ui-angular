import { Injectable, Component , ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Sample } from './sample';
import { SecurityService } from '../security/security.service';

@Injectable() 
export class SampleService {
	private url = 'sample';
	xs:HttpResponse<Sample[]>;
	samples:Sample[];
   
  	constructor(
  		private http: HttpClient, 
  		private securityService: SecurityService, 
  	) { }


	getSamples (): Observable<any> {
	    console.log('attempt get');
	    return this.http.get<Sample[]>(this.url, {observe: 'response'})
	      .pipe(
	        tap(incoming => {
	                          console.log(`fetched samples--start `);
	                          console.log(incoming);
	                          console.log(incoming.body);
	                          console.log('csrf  ' + incoming.headers.get('X-CSRF-TOKEN'));
							  this.securityService.setCSRF(incoming.headers.get('X-CSRF-TOKEN'));	
	                          console.log(`fetched samples--end `);
	                        }),
	        catchError(this.handleError<any>('getSamples', []))
	      );
	  }
	  
	  
  	  
  	  delete(id:number) : Observable<any> {
	    console.log('attempt delete');
	    console.log(this.url+'/' +id);
	    var csrf:string = this.securityService.getCSRF();
	    return this.http.delete(this.url+'/' +id,{
			   headers: {'X-CSRF-TOKEN':csrf}
			})
	      .pipe(
	        tap(incoming => {
	                          console.log(`deleted samples--start `);
	                          console.log(incoming);
	                          console.log(`deleted samples--end `);
	                        }),
	        catchError(this.handleError<any>('delete', []))
	      );
	  }
  
  	  add(content:string) : Observable<any> {
	    console.log('attempt add');
	    console.log(this.url); 
	    var newSample = new Sample();
	    var csrf:string = this.securityService.getCSRF();
	    newSample.content = content;
	    return this.http.post(this.url, newSample,{
			   headers: {'X-CSRF-TOKEN':csrf}
			} )
	      .pipe(
	        tap(incoming => {
	                          console.log(`add samples--start `);
	                          console.log(incoming);
	                          console.log(`add samples--end `);
	                        }),
	        catchError(this.handleError<any>('add', []))
	      );
	  }
	  
	  
	  update(id:number, content:string, version:number) : Observable<any> {
	    console.log('attempt add');
	    console.log(this.url+'/' +id);
	    var newSample:Sample = new Sample();
	    var csrf:string = this.securityService.getCSRF();
	    newSample.content = content;
	    newSample.id = id;
	    newSample.version = version;
	    console.log(newSample);
	    return this.http.put(this.url+'/' +id, newSample,{
			   headers: {'X-CSRF-TOKEN':csrf}
			} )
	      .pipe(
	        tap(incoming => {
	                          console.log(`add samples--start `);
	                          console.log(incoming);
	                          console.log(`add samples--end `);
	                        }),
	        catchError(this.handleError<any>('update', []))
	      );
	  }
	  
	  
  	  
	  private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {
	
	      console.error(error); // log to console instead
	
	      console.log(`${operation} failed: ${error.message}`);
	
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	  }
}
