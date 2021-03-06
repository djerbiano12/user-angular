import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user/User';
import { Router } from '@angular/router';
import { Role } from '../user/role';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  currenUser: User;
  connected: boolean = false;
  admin: boolean = false;

  constructor(private http: HttpClient,private router: Router) { }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }

    return this.http.post('http://localhost:8090/' + 'oauth/token', loginPayload, {headers});
  }

  logout() {
    window.sessionStorage.removeItem('token');
    this.connected = false;
    this.admin = false;
  }

  updateConnectionInformation(user: User){ 
    this.currenUser = user;
    this.connected = true;
    this.router.navigate(['users']);
    let listeRoles = user['roles'].map(a => a.name);
    if(listeRoles.indexOf(Role.Admin) > -1){
       this.admin = true;
      }
  }
}
