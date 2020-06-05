import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/api/auth/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/api/auth/login`, user)
      .subscribe((res: any) => {
        //localStorage.setItem('access_token', res.token)
        
        localStorage.setItem('token', res.token)
        this.getUserProfile(res.token).subscribe((res) => {
          //console.log('neweeeeeeeeeeeeeeeeeeee');
          //console.log(res);

          this.currentUser = res;
          //this.router.navigate(['user-profile/' + res.token]);
          this.router.navigate(['user-profile/' + localStorage.getItem('token')]);
        })
      })
  }

  updateuser(user: User) {
    console.log("UUUUUUUUUUUUUUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRR");
    console.log(user);
    return this.http.put<any>(`${this.endpoint}/api/auth/updatenew`, user)
      .subscribe((res: any) => {
        
      })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    //let authToken = localStorage.getItem('access_token');
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    //let removeToken = localStorage.removeItem('access_token');
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/api/auth/check?token=${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
