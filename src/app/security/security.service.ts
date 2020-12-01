import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class SecurityService {
  private csrf = null;
  private url = 'logout';
  private logoutResponse: Observable<any>; 
  
  constructor(private http: HttpClient) { }
  
  getCSRF ():  string {
		return this.csrf;
  }
  
  setCSRF(csrf:string): void{
  		this.csrf = csrf;
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
