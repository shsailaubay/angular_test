import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemesService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/themes/`);
  }

  postData(data) {
    return this.post(`/themes/`, data);
  }

  postImg(id, data) {
    const formData = new FormData();
    if (data) {
      formData.append('image', data, data.name);
    }
    return this.postImage(`/themes/${id}`, formData);
  }

  editData(id, data) {
    return this.put(`/themes/${id}`, data);
  }

  deleteData(id) {
    return this.delete(`/themes/${id}`);
  }
}
