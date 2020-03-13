import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/games/`);
  }

  postData(data) {
    return this.post(`/games/`, data);
  }

  postImg(id, data) {
    const formData = new FormData();
    if (data) {
      formData.append('image', data, data.name);
    }
    return this.postImage(`/games/${id}/image`, formData);
  }

  postIcon(id, data) {
    const formData = new FormData();
    if (data) {
      formData.append('image', data, data.name);
    }
    return this.postImage(`/games/${id}/icon`, formData);
  }

  editData(id, data) {
    return this.put(`/games/${id}`, data);
  }

  deleteData(id) {
    return this.delete(`/games/${id}`);
  }

}
