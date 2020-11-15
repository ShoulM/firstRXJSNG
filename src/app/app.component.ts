import { Component } from '@angular/core';
import {DataModel} from './models/data.model';
import {FetchDataService} from './fetch-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  private _listData: DataModel[];
  constructor(private fetchDataService: FetchDataService) {
  }
  search(value: string): any{
    if (value) {
      this.fetchDataService.fetchData(value)
        .subscribe((data) => {
        this._listData = data;
      });
    }
    else{
      this._listData = undefined;
    }
  }

  get listData(): DataModel[]{
    return this._listData;
  }
}

