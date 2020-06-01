import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginStatus } from '../../model/user.model';
import { LoginService } from '../../service/login.service';
import { FilteringService } from 'src/app/service/filtering.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  userLoginStatus$: Observable<LoginStatus>;

  private selectedDate: string = '';
  private selectedSearch: string = '';

  constructor(private router: Router,
              private loginService: LoginService,
              private filteringService: FilteringService) {
  }

  ngOnInit(): void {
    this.userLoginStatus$ = this.loginService.logged;

    this.filteringService.selectedDate.subscribe(selectedDate => this.selectedDate = selectedDate);
    this.filteringService.selectedSearch.subscribe(selectedSearch => this.selectedSearch = selectedSearch);
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
