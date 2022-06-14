import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdAuthGuard } from '../authGuard/student-auth.guard';
import { StudentListComponent } from '../student/student-list/student-list.component';
import { StudentRegisterComponent } from '../student/student-register/student-register.component';

const routes: Routes = [
  { path: 'students', component: StudentListComponent, canActivate: [StdAuthGuard] },
  { path: 'register', component: StudentRegisterComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
