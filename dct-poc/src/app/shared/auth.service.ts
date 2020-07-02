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
  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/auth/signin`, user)
      .subscribe((res: any) => {
        console.log("res = ");
        console.log(res);
        /*
        //localStorage.setItem('access_token', res.token)
        //this.getUserProfile(res._id).subscribe((res) => {
        localStorage.setItem('accessToken', res.accessToken)
        this.getUserProfile(res.accessToken).subscribe((res) => {        
          this.currentUser = res;
          //this.router.navigate(['user-profile/' + res.msg._id]);
          //this.router.navigate(['user-profile/' + localStorage.getItem('accessToken')]);
          this.router.navigate(['user-profile/' + res.id]);
        })*/
        this.router.navigate(['file-upload/' + res.id]);
      })
  }

  updateuser(user: User) {
    console.log("UUUUUUUUUUUUUUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRR");
    console.log(user);
    return this.http.put<any>(`${this.endpoint}/updatenew`, user)
      .subscribe((res: any) => {
        
      })
  }

  fileUpload(formData) {   
    return this.http.post<any>(`${this.endpoint}/uploadfile`, formData)
      .subscribe((res: any) => {
        console.log("formData res ======================== ");
        console.log(res);
        //console.log(res.status);
        console.log(res.filename);
        //alert(res.filename)
        this.downloadValidateFile(res.filename);
        //this.router.navigate(['file-upload/' + res.filename]);
      })

      //this.router.navigate(['listfileupload']);

    /*this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })*/
  }


downloadValidateFile(filename) {
  //let imgsrc = "./assets/uploads/" + filename;
  let imgsrc = "./assets/uploads/" + "SACO-CL_OFR_Excel.xlsx";

  let link = document.createElement("a");
    link.download = filename;
    link.href = imgsrc;    
    link.click();
}
        
        


  getToken() {
    return localStorage.getItem('accessToken');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('accessToken');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('accessToken');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
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