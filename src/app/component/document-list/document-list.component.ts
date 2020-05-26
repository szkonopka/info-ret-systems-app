import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchEngineService } from '../../service/search-engine.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mapTo, startWith, map, mergeMap, filter, tap } from 'rxjs/operators'

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

  constructor(private searchEngineService: SearchEngineService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({phrase}) => {
      this.documents$ = this.searchEngineService.getPaginatedDocuments(phrase, 1, this.INDEX_NAME).pipe(
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

  showDocument(id): void {
    this.router.navigate(['document/' + id], {queryParams: {id}})
  }

  onSearch(phrase: string): void {
    if (phrase.trim()) {
      this.router.navigate(['search'], {queryParams: {phrase}});
    }
  }

}
