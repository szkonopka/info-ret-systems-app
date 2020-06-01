import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchEngineService } from '../../service/search-engine.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mapTo, startWith, map, mergeMap, filter, tap } from 'rxjs/operators'
import { FilteringService } from 'src/app/service/filtering.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.sass']
})
export class DocumentListComponent implements OnInit {
  private readonly INDEX_NAME = 'plwiki-20200301';
  
  documents$: Observable<Document[]>;
  engineConnected$: Observable<boolean>;

  private esData: any[];

  private selectedSearch: string = '';
  private selectedDate: string = '';

  constructor(private searchEngineService: SearchEngineService,
              private route: ActivatedRoute,
              private router: Router,
              private filteringService: FilteringService) {
  }

  ngOnInit(): void {
    this.filteringService.selectedDate.subscribe(selectedDate => this.selectedDate = selectedDate);
    this.filteringService.selectedSearch.subscribe(selectedSearch => this.selectedSearch = selectedSearch);

    this.route.queryParams.subscribe(({phrase}) => {
      this.documents$ = this.searchEngineService.getPaginatedDocuments(this.selectedDate, this.selectedSearch, phrase, 1, this.INDEX_NAME).pipe(
          tap(esData => { 
            esData.hits.hits.length <= 0 ? alert('Nie znaleziono żadnych wyników wyszukiwania') : null
          }),
          map(esData => esData.hits.hits.map(document => document._source as Document)))
        }
      );

    this.engineConnected$ = this.searchEngineService.isAvailable()
      .pipe(
        map(() => true),
        startWith(false)
      )
  }

  showShortText(text: string): string {
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }

  showDocument(id): void {
    this.router.navigate(['document/' + id], {queryParams: {id}})
  }

  onSearch(phrase: string): void {
    if (phrase.trim()) {
      this.router.navigate(['search'], {queryParams: {phrase}});
    }
  }

}
