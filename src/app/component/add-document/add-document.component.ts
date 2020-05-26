import { Component, OnInit } from '@angular/core';
import { SearchEngineService } from '../../service/search-engine.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.sass']
})
export class AddDocumentComponent implements OnInit {

  private readonly INDEX_NAME = 'plwiki-20200301';

  title: string;
  text: string;

  constructor(private searchEngineService: SearchEngineService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onAddDocument(): void {
    this.searchEngineService.addDocument(this.INDEX_NAME, this.title, this.text).subscribe(
      response => this.router.navigate(['/'])
    );
  }

  onClear(): void {
    this.title = '';
    this.text = '';
  }

}
