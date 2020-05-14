import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginStatus } from '../../model/user.model';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  userLoginStatus$: Observable<LoginStatus>;

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.userLoginStatus$ = this.loginService.logged;
  }

  onSearch(phrase: string): void {
    if (phrase.trim()) {
      this.router.navigate(['search'], {queryParams: {phrase}});
    }
  }

  onLogout(): void {
    this.loginService.logout();
  }

}
