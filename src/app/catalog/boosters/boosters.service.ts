import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoostersService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/boosters/`);
  }

  postData(data) {
    return this.post(`/boosters/`, data);
  }

  postImg(id, data) {
    const formData = new FormData();
    if (data) {
      formData.append('image', data, data.name);
    }
    return this.postImage(`/boosters/${id}`, formData);
  }

  editData(id, data) {
    return this.put(`/boosters/${id}`, data);
  }

  deleteData(id) {
    return this.delete(`/boosters/${id}`);
  }
}
