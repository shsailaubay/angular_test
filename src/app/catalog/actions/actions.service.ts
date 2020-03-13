import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getActions() {
    return this.get('/actions/actives');
  }

  postAction(data) {
    return this.post(`/actions/`, data);
  }

  postActionImage(id, data) {
    const formData = new FormData();
    if (data) {
      formData.append('image', data, data.name);
    }
    return this.postImage(`/actions/${id}`, formData);
  }

  editAction(id, data) {
    return this.put(`/actions/${id}`, data);
  }

  deleteAction(id) {
    return this.delete(`/actions/${id}`);
  }

}
