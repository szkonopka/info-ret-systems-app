import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  private selectedDateSource = new BehaviorSubject<string>('');
  selectedDate = this.selectedDateSource.asObservable();

  private selectedSearchSource = new BehaviorSubject<string>('');
  selectedSearch = this.selectedSearchSource.asObservable();

  changeSelectedSearch(selectedSearch: string) {
    this.selectedSearchSource.next(selectedSearch);
  }

  changeSelectedDate(selectedDate: string) {
    this.selectedDateSource.next(selectedDate);
  }

  constructor() { }
}
