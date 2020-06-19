import { ProgramsService } from "./../../programs.service";
import { Component, OnInit } from "@angular/core";
import { Program } from "../../program.model";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { REVIEWS } from "./program-review";

@Component({
  selector: "app-program-detail",
  templateUrl: "./program-detail.page.html",
  styleUrls: ["./program-detail.page.scss"],
})
export class ProgramDetailPage implements OnInit {
  public program: any;
  public starColors: any = [false, false, false, false, false];
  public categoryId: any;
  public reviews = [];
  public safetyValue = Math.round(Math.random() * 100);
  public reviewsCount = this.getRandomInt(3000, 5000);
  constructor(
    private route: ActivatedRoute,
    private programService: ProgramsService,
    private modalCtrl: ModalController
  ) {}

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params["catId"];
    });
    this.route.paramMap.subscribe((paramsData) => {
      const id = paramsData["params"]["id"];
      this.programService
        .getProgramDetail(this.categoryId)
        .subscribe((data) => {
          this.program = data["programs"].find((e) => {
            return e.id === +id;
          });
          console.log(this.program);
          this.setReviews(this.program);
        });
    });
  }

  setReviews(program) {
    if (program.affordability > 75) {
      this.starColors = [true, true, true, true, true];
      this.reviews.push(REVIEWS[0], REVIEWS[1]);
    } else if (program.affordability > 50 && program.affordability < 75) {
      this.starColors = [true, true, true, false, false];
      this.reviews.push(REVIEWS[1], REVIEWS[2]);
    } else if (program.affordability > 25 && program.affordability < 50) {
      this.starColors = [true, true, false, false, false];
      this.reviews.push(REVIEWS[2], REVIEWS[3]);
    } else {
      this.starColors = [true, false, false, false, false];
      this.reviews.push(REVIEWS[3], REVIEWS[4]);
    }
    console.log(this.reviews);
  }

  starProgram() {
    this.programService.makeStarred(this.program.id).subscribe((data) => {
      console.log(data);
    });
  }

  makeFavorite() {
    this.program["starred"] = this.program["starred"]
      ? !this.program["starred"]
      : true;
  }
}
