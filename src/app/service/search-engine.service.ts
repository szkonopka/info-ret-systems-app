import { Injectable } from '@angular/core';
import { Observable, from, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Client } from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {
  
  private client: Client;

  private readonly PER_PAGE = 10;
  private readonly QUERY_ALL_DOCS = {
    'query': {
      'match_all': {}
    },
    'sort': [
      {'score': {'order': 'desc'}}
    ]
  }
  constructor(private http: HttpClient) {
    if (!this.client) {
      this._connect();
    }
  }

  getAllDocuments(_query, _index?, _type?): Observable<any> {
    return from(this.client.search({
      q: _query,
      index: _index,
      type: _type,
      body: this.QUERY_ALL_DOCS
    }));
  }

  getPaginatedDocuments(_query, _page, _index?, _type?): Observable<any> {
    return from(this.client.search({
      q: _query,
      type: _type,
      from: (_page - 1) * this.PER_PAGE,
      size: this.PER_PAGE
    }));
  }

  getNextPage(scrollId): any {
    return this.client.scroll({
      scrollId: scrollId,
      scroll: '1m'
    })
  }

  getDocument(_id, _index, _type?): Observable<any> {
    return from(this.client.get({
      index: _index,
      type: _type,
      id: _id
    }));
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
      host: 'http://localhost:9200',
      //log: 'trace'
    });
  }
}
