import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StdAuthService {

  constructor() { }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
