import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/apiService/student.service';
import { StudentLoginToken } from 'src/app/model/student';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css'],
})
export class StudentRegisterComponent implements OnInit {
  stdForm!: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private stdService: StudentService, private router: Router,private _snackBar: MatSnackBar,) {}

  email!:any;

  hide = true;

  ngOnInit(): void {
    this.stdForm = new FormGroup({
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

  register():void {
    if(this.stdForm.valid) {
      this.stdService
      .register(this.stdForm.value)
      .subscribe((res: any) => {
        this.openSnackBar('Register success')
        localStorage.setItem('token', res.token)
        this.router.navigate(['students'])
      }, () => {
        this.openSnackBar('Register failed')
      });
    }
  }

  openSnackBar(display: string): void {
    this._snackBar.open(display, 'Close', {
      duration: 5000,
      panelClass: ["custom-snackbar"],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
