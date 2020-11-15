import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataModel} from './models/data.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private httpClient: HttpClient) { }

  public fetchData(searchValue: string): Observable<DataModel[]>{
    const params = new HttpParams({
      fromObject: {format: 'json', search: searchValue}
    });
    return this.httpClient.get('https://nztodo.herokuapp.com/api/tasks/', {params, responseType: 'json'})
      .pipe(map((object: [object]) => object.map((obj) => new DataModel(obj))));
  }
}
