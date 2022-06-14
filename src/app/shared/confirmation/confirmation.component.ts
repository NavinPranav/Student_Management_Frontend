import { ConstantPool } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/apiService/student.service';
import { StudentCrudComponent } from 'src/app/student/student-crud/student-crud.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private stdService: StudentService,
    public dialogRef: MatDialogRef<StudentCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public editedData: any,
    private _snackBar: MatSnackBar,
    private router: Router,
    public activeRoute: ActivatedRoute
  ) {}

  conform = true

  ngOnInit(): void {}

  editStd():void {
    if (this.editedData.edit) {
      
      this.stdService
        .editStd(this.editedData.editId, this.editedData.editedDetail)
        .subscribe(() => {
          this.dialogRef.close(),
            this.openSnackBar('Student edited'),
            this.router.navigate(['students']);
        });
    }
  }
  deleteStd():void {
    if (this.editedData.delete) {
      this.stdService.deleteStd(this.editedData.deleteId).subscribe(() => {
        this.dialogRef.close(), this.openSnackBar('Student deleted');
      });
    }
  }
  saveStd():void {
    this.stdService.createStd(this.editedData.createData).subscribe(() => {
      this.dialogRef.close(),
        this.openSnackBar('Student created'),
        this.router.navigate(['students']);
    });
  }
  close():void {
    this.dialogRef.close();
  }

  openSnackBar(display: string):void {
    this._snackBar.open(display, 'Close', {
      duration: 5000,
      panelClass: ["custom-snackbar"],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
