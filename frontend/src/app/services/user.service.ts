import { parse } from './../../../node_modules/vite/node_modules/postcss/lib/postcss.d';
import { Locals } from './../../../../backend/node_modules/@types/express-serve-static-core/index.d';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY: string = "User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserFromLocalStorage()); 
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
  return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
    tap((user: User) => {
      this.setUserToLocalStorage(user);
      this.userSubject.next(user);
      this.toastrService.success(
        `Welcome to Foodmine ${user.name}!`,
        'Login Successful'
      );
    }),
    catchError((errorResponse) => {
      this.toastrService.error(
        errorResponse.error || 'Unexpected error occurred',
        'Login Failed'
      );
      return throwError(() => errorResponse);
    })
  );
}

private setUserToLocalStorage(user: User) :void {
  localStorage.setItem(USER_KEY, JSON.stringify(user)); 
}

private getUserFromLocalStorage() :User {
  const userJson: string | null = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) as User : new User();
}

logout() {
  this.userSubject.next(new User());
  localStorage.removeItem(USER_KEY);
  window.location.reload();
}
}
