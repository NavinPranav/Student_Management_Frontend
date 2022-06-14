import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [LoginComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
