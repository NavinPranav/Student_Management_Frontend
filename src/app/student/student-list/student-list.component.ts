import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/apiService/student.service';
import { Student, StudentListData } from 'src/app/model/student';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { StudentViewComponent } from '../student-view/student-view.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  constructor(
    private stdService: StudentService,
    public dialog: MatDialog,
    public activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}

  // students: Student[] = [];

  students:any; 
  secondCopy: any;

  fullName!: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    setTimeout(() => {
      this.listStudent();
    }, 1000)
  }

  openStudentViewDialogue(student: Student): void {
    // this.dialog.open(StudentViewComponent, {
    //   width: 'auto',
    //   data: student,
    // });
    this.router.navigate([`student/${student}`])
    
  }

  listStudent(): void {
    this.students = [];
    this.secondCopy = [];
    this.stdService.getAllStd().subscribe((res: Object) => {
      console.log(res);
      // this.students = <Student[]>(<unknown>(<StudentListData>res));
      // this.secondCopy = <Student[]>(<unknown>(<StudentListData>res));
      this.students = res
      this.secondCopy = res
    });
  }

  filterStudent(event: Event): void {
    const stdDetail = (<HTMLInputElement>event.target).value;
    this.students = this.secondCopy.filter((res: any) => {
      this.fullName = `${res.FirstName.toLowerCase()}${res.LastName.toLowerCase()}`;
      return (
        this.fullName.includes(stdDetail.toLowerCase().replace(' ', '')) ||
        res.FirstName.toLowerCase().includes(stdDetail.toLowerCase()) ||
        res.LastName.toLowerCase().includes(stdDetail.toLowerCase())
      );
    });
    if (this.students.length <= 0) {
      this.openSnackBar('There is no student with this name or email');
    }
  }

  crudComponent(id: String) {
    if(id){
      this.router.navigate([`student/edit/${id}`])
    } else {
    this.router.navigate(['student/create'])
    }
  }
  openDeleteConfirmation(id: number): void {
    console.log(this.activeRoute.snapshot.params['id']);
    let deleteData = {
      delete: true,
      deleteId: id,
    };
    this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: deleteData,
    });
  }

  openSnackBar(display: string): void {
    this._snackBar.open(display, 'Close', {
      duration: 2000,
      panelClass: ['custom-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
