import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdAuthGuard } from '../authGuard/student-auth.guard';
import { StudentCrudComponent } from './student-crud/student-crud.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  {path: 'students', component: StudentListComponent, canActivate: [StdAuthGuard]},
  {path:'student/edit/:id', component: StudentCrudComponent, canActivate: [StdAuthGuard]},
  {path:'student/delete/:id', component: StudentCrudComponent, canActivate: [StdAuthGuard]},
  {path:'student/create', component: StudentCrudComponent, canActivate: [StdAuthGuard]},
  {path: 'student/:id', component: StudentViewComponent, canActivate: [StdAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
