import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchEngineService } from '../../service/search-engine.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mapTo, startWith, map } from 'rxjs/operators'

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.sass']
})
export class DocumentListComponent implements OnInit {

  documents$: Observable<Document[]>;
  engineConnected$: Observable<boolean>;

  constructor(private searchEngineService: SearchEngineService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({phrase}) => {
      this.documents$ = this.searchEngineService.searchDocument(phrase);
    });

    this.engineConnected$ = this.searchEngineService.isAvailable()
      .pipe(
        map(() => true),
        startWith(false)
      )
  }

  onSearch(phrase: string): void {
    if (phrase.trim()) {
      this.router.navigate(['search'], {queryParams: {phrase}});
    }
  }

}
