import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import studentConst from 'src/app/helper/constant';
import { Student, StudentLogin } from '../model/student';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAllStd() {
    return this.http.get(`${environment.apiBaseUrl}${studentConst.getAllStdPage}`).pipe(delay(3000));
  }

  loginIn(loginData: StudentLogin) {
    return this.http.post(
      `${environment.apiBaseUrl}${studentConst.loginStd}`,
      loginData,
      {responseType: 'text'}
    );
  }

  editStd(id: number, editData: Student) {
    return this.http.put(`${environment.apiBaseUrl}${studentConst.updateStdById}${id}`, editData
    )
  }

  deleteStd(id:number) {
    return this.http.delete(`${environment.apiBaseUrl}${studentConst.deleteStdById}${id}`)
  }

  getStdById (id: number) {
    return this.http.get(`${environment.apiBaseUrl}${studentConst.getStdById}${id}`)
  }

  createStd (student: Student) {
    return this.http.post(`${environment.apiBaseUrl}${studentConst.createStd}`, student)
  }

  register (data: StudentLogin) {
    return this.http.post(`${environment.apiBaseUrl}${studentConst.registerStd}`, data)
  }
}
