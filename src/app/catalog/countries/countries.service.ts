import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getCountries() {
    return this.get(`/countries/`);
  }

  postCountry(data) {
    return this.post(`/countries/`, data);
  }

  postFlag(id, data) {
    const formData = new FormData();
    if (data) {
      formData.append('image', data, data.name);
    }
    return this.postImage(`/countries/${id}`, formData);
  }

  editCountry(id, data) {
    return this.put(`/countries/${id}`, data);
  }

  deleteCountry(id) {
    return this.delete(`/countries/${id}`);
  }

}
