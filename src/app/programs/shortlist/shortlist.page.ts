import { CATEGORIES } from "./../categories-data";
import { Component, OnInit } from "@angular/core";
import { ProgramsService } from "../programs.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-shortlist",
  templateUrl: "./shortlist.page.html",
  styleUrls: ["./shortlist.page.scss"],
})
export class ShortlistPage implements OnInit {
  public shortListedPrograms: any;
  constructor(
    private programsService: ProgramsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getFavorites();
  }

  getFavorites() {
    this.programsService.getCategories().subscribe((data) => {
      let allPrograms = [];
      Object.keys(data).forEach((key) =>
        allPrograms.push(...data[key]["programs"])
      );
      this.shortListedPrograms = allPrograms.filter(
        (program) => program["starred"]
      );
      console.log(this.shortListedPrograms);
    });
  }

  ionViewWillEnter() {
    console.log("test");
    this.getFavorites();
  }

  navigateToDetail(programId: number, category: string) {
    const catId = Object.keys(CATEGORIES).find((key) => {
      return CATEGORIES[key].indexOf(category) >= 0;
    });
    console.log(catId);
    this.router.navigate([`/categories/landing/${catId}/programs`, programId], {
      queryParams: { catId: catId },
      relativeTo: this.route,
    });
  }
}
