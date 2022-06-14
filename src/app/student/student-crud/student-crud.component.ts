import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/apiService/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { Student, StudentGetById } from 'src/app/model/student';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css'],
})
export class StudentCrudComponent implements OnInit {
  editStudent = false;

  createStudent = false;

  stdForm!: any;

  stdDetail!: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private stdService: StudentService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.editStudent = true;
    } else if (this.router.url.includes('create')) {
      this.createStudent = true;
    }
    this.stdForm = new FormGroup({
      Age: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{0,3}$/)]),
      City: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9- ]{3,30}$/),]),
      Country: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z- ]{2,30}$/)]),
      FirstName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9- ]{3,20}$/)]),
      Gender: new FormControl('',[Validators.required]),
      Grade: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{0,3}$/)]),
      Height: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{0,3}$/)]),
      LastName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9- ]{3,20}$/)]),
      Major: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z- ]{3,20}$/)]),
      SAT: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{0,4}$/)]),
      State: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z- ]{3,20}$/)]),
      StudentStatus: new FormControl('',[Validators.required]),
    });
    if (this.activeRoute.snapshot.params['id']) {
      this.stdService
        .getStdById(this.activeRoute.snapshot.params['id'])
        .subscribe((res:any) => {
          this.stdDetail = res, this.setValue();
        });
    }
  }

  setValue(): void {
    console.log(this.stdDetail)
    this.stdForm.patchValue({
      Age: this.stdDetail.Age,
      City: this.stdDetail.City,
      Country: this.stdDetail.Country,
      FirstName: this.stdDetail.FirstName,
      Gender: this.stdDetail.Gender,
      Grade: this.stdDetail.Grade,
      Height: this.stdDetail.Height,
      LastName: this.stdDetail.LastName,
      Major: this.stdDetail.Major,
      SAT: this.stdDetail.SAT,
      State: this.stdDetail.State,
      StudentStatus: this.stdDetail.StudentStatus,
    });
  }

  openEditConfirmation(): void {
    if (this.stdForm.valid) {
      let editedData = {editId: this.activeRoute.snapshot.params['id'], edit: true, editedDetail: this.stdForm.value };
      this.dialog.open(ConfirmationComponent, {
        width: '500px',
        data: editedData,
      });
    } else {
      this.openSnackBar('Enter valid details');
    }
  }

  openCreateConfirmation(): void {
    if (this.stdForm.valid) {
      let createData = {
        create: true,
        createData: this.stdForm.value,
      };
      this.dialog.open(ConfirmationComponent, {
        width: '500px',
        data: createData,
      });
    } else {
      this.openSnackBar('Enter valid details');
    }
  }

  openSnackBar(display: string): void {
    this._snackBar.open(display, 'Close', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  cancel(): void {
    this.router.navigate(['student-list']);
  }
}
