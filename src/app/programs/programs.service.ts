import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Program } from "./program.model";

@Injectable({
  providedIn: "root",
})
export class ProgramsService {
  public URL = "https://hack-a-roo.firebaseio.com/";
  constructor(private http: HttpClient) {}

  getPrograms(categoryId: number) {
    const catId = categoryId - 1;
    return this.http.get(`${this.URL}/data/${catId}.json`);
  }

  getCategories(): any {
    return this.http.get(`${this.URL}/data.json`);
  }
  getProgramDetail(categoryId: number): any {
    const catId = categoryId - 1;
    return this.http.get(`${this.URL}/data/${catId}/programs.json`);
  }

  makeStarred(catId: number, programIndex: number, value) {
    return this.http.patch(
      `${this.URL}/data/${catId - 1}/programs/${programIndex}.json`,
      {
        starred: value,
      }
    );
  }
}
