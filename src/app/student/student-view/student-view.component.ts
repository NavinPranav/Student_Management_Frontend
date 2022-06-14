import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/apiService/student.service';
import { Student } from 'src/app/model/student';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent implements OnInit {
  constructor(
    public activeRoute: ActivatedRoute,
    private stdService: StudentService,
    public dialog: MatDialog,
  ) {}

  email = ''

  studentData!: any;

  stdForm!: any;

  propic = false;

  studentDataInfo =
    '@aryanjain_in & @Shreelaxmi20 had a great time at the @KPRIETonline interacting with students and delivering the lecture on #NFT, #Metaverse, and related concepts. They loved the hospitality of the university and especially want to thank Dr.Indra J for the cooperation & support.';

  ngOnInit(): void {
    this.stdForm = new FormGroup({
      Age: new FormControl(Validators.required),
      City: new FormControl(Validators.required),
      Country: new FormControl(Validators.required),
      FirstName: new FormControl(Validators.required),
      Gender: new FormControl(Validators.required),
      Grade: new FormControl(Validators.required),
      Height: new FormControl(Validators.required),
      LastName: new FormControl(Validators.required),
      Major: new FormControl(Validators.required),
      SAT: new FormControl(Validators.required),
      State: new FormControl(Validators.required),
      StudentStatus: new FormControl(Validators.required),
    });
    const studentId = this.activeRoute.snapshot.params['id'];
    console.log(studentId);
    this.stdService.getStdById(studentId).subscribe((res) => {
      (this.studentData = res), this.setValue();
    });
  }

  setValue(): void {
    this.stdForm.patchValue({
      Age: this.studentData.Age,
      City: this.studentData.City,
      Country: this.studentData.Country,
      FirstName: this.studentData.FirstName,
      Gender: this.studentData.Gender,
      Grade: this.studentData.Grade,
      Height: this.studentData.Height,
      LastName: this.studentData.LastName,
      Major: this.studentData.Major,
      SAT: this.studentData.SAT,
      State: this.studentData.State,
      StudentStatus: this.studentData.StudentStatus,
    });
  }

  applyChanges() {
    if (this.stdForm) {
      this.dialog.open(ConfirmationComponent, {
        width: '500px',
        data: 'sadfsf'
      })
    }
  }
}
