import { Component, OnInit } from '@angular/core';
import { FilteringService } from 'src/app/service/filtering.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.sass']
})
export class FilteringComponent implements OnInit {

  readonly dates = [
    {id: 'whenever', name: 'Kiedykolwiek'},
    {id: '24h', name: 'Ostatnie 24 godzin'},
    {id: 'week', name: 'Ostatni tydzień'},
    {id: 'month', name: 'Ostatni miesiąc'},
    {id: 'halfyear', name: 'Ostatnie pół roku'},
    {id: 'year', name: 'Ostatni rok'}
  ];

  readonly searches = [
    {id: 'wherever', name: 'Gdziekolwiek'},
    {id: 'title', name: 'tylko nagłówki'},
    {id: 'text', name: 'tylko treść'}
  ];

  selectedDate = this.dates[0].id;
  selectedSearch = this.searches[0].id;

  constructor(private filteringService: FilteringService) { }

  ngOnInit(): void { }

  onChange(event) {
    this.filteringService.changeSelectedDate(this.selectedDate);
    this.filteringService.changeSelectedSearch(this.selectedSearch);
  }

}
