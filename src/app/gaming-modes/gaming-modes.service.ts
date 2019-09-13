import {Injectable} from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamingModesService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/game_options/`);
  }

  postData(data) {
    return this.post(`/game_options/`, data);
  }

  editData(id, data) {
    return this.put(`/game_options/${id}`, data);
  }

  deleteData(id) {
    return this.delete(`/game_options/${id}`);
  }
}
