import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {

  private client: Client;

  constructor(private http: HttpClient) {
    if (!this.client) {
      this._connect();
    }
  }

  searchDocument(phrase: string): Observable<Document[]> {
    return this.http.get<Document[]>('./assets/documents.json');
  }

  addDocument(title: string, text: string): void {
    // to be implemented
  }

  isAvailable(): Observable<any> {
    return from(this.client.ping({
      requestTimeout: Infinity,
      body: 'hello!'
    }));
  }

  private _connect() {
    this.client = new Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }
}
