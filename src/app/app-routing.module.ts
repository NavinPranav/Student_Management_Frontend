import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdAuthGuard } from './authGuard/student-auth.guard';
import { StudentListComponent } from './student/student-list/student-list.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path: 'student-list', component: StudentListComponent, canActivate: [StdAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
