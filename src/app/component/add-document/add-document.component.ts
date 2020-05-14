import { Component, OnInit } from '@angular/core';
import { SearchEngineService } from '../../service/search-engine.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.sass']
})
export class AddDocumentComponent implements OnInit {

  title: string;
  text: string;

  constructor(private searchEngineService: SearchEngineService) {
  }

  ngOnInit(): void {
  }

  onAddDocument(): void {
    this.searchEngineService.addDocument(this.title, this.text);
  }

  onClear(): void {
    this.title = '';
    this.text = '';
  }

}
