import { Component, OnInit } from '@angular/core';
import { SearchEngineService } from 'src/app/service/search-engine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.sass']
})
export class DocumentComponent implements OnInit {

  private readonly INDEX_NAME = 'plwiki-20200301';

  document$: Observable<Document>;
  
  constructor(private searchEngineService: SearchEngineService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({id}) => {
      this.document$ = this.searchEngineService.getDocument(id, this.INDEX_NAME).pipe(
          map(document => { return document._source as Document })
        )}
      );
  }

}
