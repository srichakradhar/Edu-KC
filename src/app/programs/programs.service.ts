import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Program } from "./program.model";

@Injectable({
  providedIn: "root",
})
export class ProgramsService {
  public URL = "http://localhost:3000/data";
  constructor(private http: HttpClient) {}

  getPrograms(categoryId: Number) {
    return this.http.get(`${this.URL}/${categoryId}`);
  }

  getCategories():any {
    return this.http.get(this.URL);
  }
  getProgramDetail(id: Number):any {
    return this.http.get(`${this.URL}/${id}`);
  }
  
  makeStarred(id: Number) {
    return this.http.patch(`${this.URL}/programs/${id}.json`, {
      starred : true
    });
  }
}
