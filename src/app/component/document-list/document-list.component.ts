import { Component, OnInit } from '@angular/core';
import { SearchEngineService } from '../../service/search-engine.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.sass']
})
export class DocumentListComponent implements OnInit {

  documents$: Observable<Document[]>;

  constructor(private searchEngineService: SearchEngineService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({phrase}) => {
      this.documents$ = this.searchEngineService.searchDocument(phrase);
    });

  }

}
