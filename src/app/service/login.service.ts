import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginStatus, User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  logged: BehaviorSubject<LoginStatus> = new BehaviorSubject<LoginStatus>({logged: false});
  private user: User = {
    login: 'admin',
    password: 'admin'
  };

  constructor(private router: Router) {
  }

  login(login: string, password: string): void {
    if (login === this.user.login && password === this.user.password) {
      this.logged.next({logged: true});
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    if (this.logged.value) {
      this.logged.next({logged: false});
      this.router.navigate(['/']);
    }
  }

}
