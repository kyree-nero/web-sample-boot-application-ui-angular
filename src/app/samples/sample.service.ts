import { Injectable, Component , ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Sample } from './sample';
import { SampleView } from './sample.view';
import { SampleAddView } from './sample.add.view';
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
  
  	  add(sampleAddView: SampleAddView) : Observable<any> {
	    console.log('attempt add');
	    console.log(this.url); 
	    var newSample = new Sample();
	    var csrf:string = this.securityService.getCSRF();
		newSample.content = sampleAddView.content;
		sampleAddView.errors = [];
	    return this.http.post(this.url, newSample,{
			   headers: {'X-CSRF-TOKEN':csrf}
			} )
	      .pipe(
	        tap(incoming => {
	                          console.log(`add samples--start `);
	                          console.log(incoming);
	                          console.log(`add samples--end `);
	                        }),
	        catchError(this.handleErrorForAdd<any>('add', sampleAddView, []))
	      );
	  }

	  
	  
	  
	//   update(id:number, content:string, version:number) : Observable<any> {
	update(sampleView:SampleView) : Observable<any> {
		console.log('attempt update');
		console.log(sampleView);
	    console.log(this.url+'/' +sampleView.sample.id);
	    var newSample:Sample = new Sample();
	    var csrf:string = this.securityService.getCSRF();
	    newSample.content = sampleView.alteredContent;
	    newSample.id = sampleView.sample.id;
	    newSample.version = sampleView.sample.version;
		console.log(newSample);
		sampleView.errors = [];
	    return this.http.put(this.url+'/' +sampleView.sample.id, newSample,{
			   headers: {'X-CSRF-TOKEN':csrf}
			} )
	      .pipe(
	        tap(incoming => {
	                          console.log(`update samples--start `);
	                          console.log(incoming);
	                          console.log(`update samples--end `);
	                        }),
	        catchError(this.handleErrorBySampleView<any>('update', sampleView, []))
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

	  private handleErrorForAdd<T> (operation = 'operation', addSample: SampleAddView, result?: T) {
	    return (data: any): Observable<T> => {
	      console.error(data); // log to console instead
		  
	      console.log(`${operation} failed: ${data.message}`);
			
		  if( data.status == 400 ){
			//bad request

			console.log ("bad request... parse")

			

			var errormessages = [];
			for ( var dataError in data.error.errors){
				console.log('cm ... ' +  data.error.errors[dataError].defaultMessage);
				addSample.errors.push(data.error.errors[dataError].defaultMessage);
				//errormessages.push(dataError.defaultMessage);
			}
			console.log('errors is now ' + addSample.errors.length)
		 }
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	  }

	  private handleErrorBySampleView<T> (operation = 'operation', sampleView: SampleView, result?: T) {
	    return (data: any): Observable<T> => {
		  console.log(sampleView);
	      console.error(data); // log to console instead
		  
	      console.log(`${operation} failed: ${data.message}`);
			
		 if( data.status == 400 ){
			//bad request

			console.log ("bad request... parse")

			

			var errormessages = [];
			for ( var dataError in data.error.errors){
				console.log('cm ... ' +  data.error.errors[dataError].defaultMessage);
				sampleView.errors.push(data.error.errors[dataError].defaultMessage);
				//errormessages.push(dataError.defaultMessage);
			}
			
		 }
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	  }
}
