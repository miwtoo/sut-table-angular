import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SutRegService {

  private url = 'https://server-pcshnlzejn.now.sh';

  constructor(private http: HttpClient) { }

  getData(id, year, term): Observable<Object> {
    return this.http.get(this.url+ '/api' + '/'+id + '/' + year + '/' + term)
  }
}
