import { Component } from '@angular/core';
import {DataModel} from './models/data.model';
import {FetchDataService} from './fetch-data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  private _listData$: Observable<DataModel[]>;
  constructor(private fetchDataService: FetchDataService) {
  }
  search(value: string): any{
    if (value) {
      this._listData$ = this.fetchDataService.fetchData(value);
    }
    else{
      this._listData$ = undefined;
    }
  }

  get listData$(): Observable<DataModel[]>{
    return this._listData$;
  }
}

