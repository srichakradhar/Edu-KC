import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public URL = 'https://hack-a-roo.firebaseio.com'; 
  constructor(private http:HttpClient) { }

  storeProfileData(data) {
    localStorage.setItem('profile', JSON.stringify(data));
    return this.http.post(`${this.URL}/profile.json`, data)
  }

  getProfileData() {
    return this.http.get(this.URL)
  }

  // updateProfileData(id, data) {
  //   const url = `${this.URL}/profile/${id}.json`;
  //   return this.http.put(url, data)
  // }
}
