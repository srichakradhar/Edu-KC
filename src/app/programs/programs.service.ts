import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Program } from "./program.model";

@Injectable({
  providedIn: "root",
})
export class ProgramsService {
  public URL = "https://hack-a-roo.firebaseio.com/";
  constructor(private http: HttpClient) {}

  getPrograms(categoryId: Number) {
    return this.http.get(`${this.URL}/data/${categoryId}.json`);
  }

  getCategories(): any {
    return this.http.get(`${this.URL}/data.json`);
  }
  getProgramDetail(id: Number): any {
    return this.http.get(`${this.URL}/data/${id}.json`);
  }

  makeStarred(id: Number) {
    return this.http.patch(`${this.URL}/programs/${id}.json`, {
      starred: true,
    });
  }
}
