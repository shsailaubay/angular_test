import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamingModesService extends ApiService {

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
