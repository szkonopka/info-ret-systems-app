import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {

  constructor(private http: HttpClient) {
  }

  searchDocument(phrase: string): Observable<Document[]> {
    return this.http.get<Document[]>('./assets/documents.json');
  }

  addDocument(title: string, text: string): void {
    // to be implemented
  }

}
