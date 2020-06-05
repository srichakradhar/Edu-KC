import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityMemberService {
  public url = 'http://localhost:3000/community-programs';
  constructor(private http: HttpClient) { }

  saveProgramData(data){
    return this.http.post(this.url, data);
  }
}
