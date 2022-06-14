import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/apiService/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { StudentLoginToken } from 'src/app/model/student';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = 'eve.holt@reqres.in';

  password = 'pistol';

  hide = true;

  myForm!: any;

  test = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private stdService: StudentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(0),
      ]),
    });
  }

  logIn():void {
    if (this.myForm.valid) {
      console.log(this.myForm.value)
      this.stdService.loginIn(this.myForm.value).subscribe(
        (res: any) => {
          this.openSnackBar('Login success');
          this.router.navigate(['students']);
          localStorage.setItem('token',res.token)
        },
        (err:any) => {
          this.openSnackBar(err);
        }
      );
    } else {
      this.openSnackBar('Invalid user name or password');
    }
  }

  openSnackBar(display: string):void {
    this._snackBar.open(display, 'Close', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
