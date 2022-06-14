import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './apiService/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedIn = false;

  provide = true;

  ngOnInit(): void {
    localStorage.getItem('token')
      ? (this.loggedIn = true)
      : (this.loggedIn = false);
  }
  title = 'studentManagementSystem';

  constructor(private router: Router, private apiService: StudentService) {}
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    window.location.reload();
  }
}
