import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StdAuthService } from 'src/app/authGuard/student-auth.service';

@Injectable({
  providedIn: 'root',
})
export class StdAuthGuard implements CanActivate {
  constructor(
    private _stdAuthService: StdAuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this._stdAuthService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
