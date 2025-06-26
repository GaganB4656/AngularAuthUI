import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7087/api/User/';
  constructor(private _http: HttpClient) { }

  signUp(userData: any) {
    return this._http.post(this.baseUrl + 'register', userData);
  }

  login(userData: any) {
    return this._http.post(this.baseUrl + 'authenticate', userData);
  }
}
