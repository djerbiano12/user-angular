import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {User} from "./User";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/users';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  canConnect(email: string, password: string) {
    const params = new HttpParams()
    .set('email', email)
    .set('password', password);
    return this.http.get<Boolean>(this.baseUrl + '/auth' , {params});
  }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }

    return this.http.post('http://localhost:8090/' + 'oauth/token', loginPayload, {headers});
  }
}
