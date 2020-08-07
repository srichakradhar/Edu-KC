import { FilterModalComponent } from "./../filter-modal/filter-modal.component";
import { ProfilePage } from "./../../profile/profile.page";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { ProgramsService } from "./../programs.service";
import {
  LoadingController,
  ModalController,
  MenuController,
  IonRouterOutlet,
} from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { CATEGORIES } from "./../categories-data";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  public categories = CATEGORIES;
  public children: any;
  public showChildBtn = false;
  public childNumber: any = 0;
  public category: any;
  public categoryId: number;
  public recommendedPrograms: any;
  public searchMessage = null;
  public allPrograms: any = [];
  constructor(
    private programService: ProgramsService,
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private menuController: MenuController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.getProfileData();
    this.route.params.subscribe((params) => {
      this.categoryId = +params["id"];
      this.category = this.categories[params["id"]];
      this.getPrograms(this.categoryId);
    });
  }

  getProfileData() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      this.children = profile.userType === "Parent" ? profile.children : null;
    }
  }
  getPrograms(catId: number) {
    const loading = this.loadingController
      .create({
        cssClass: "my-custom-class",
        message: "Loading.....",
      })
      .then((loadingEl) => {
        loadingEl.present();

        this.programService.getPrograms(catId).subscribe((data) => {
          const recommendedPrograms = [...data["programs"]];
          // this.allPrograms = [
          // recommendedPrograms.slice(0, 24).sort(this.compare),
          // recommendedPrograms.slice(25, 50).sort(this.compare),
          // ];
          this.allPrograms = [recommendedPrograms.slice(0, 24)];
          console.log(this.allPrograms);
          loadingEl.dismiss();
        });
      });
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const programA = a.relevance;
    const programB = b.relevance;

    let comparison = 0;
    if (programA > programB) {
      comparison = 1;
    } else if (programA < programB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  showResults(index) {
    this.childNumber = index;
    console.log(this.allPrograms[this.childNumber]);
  }

  async openFilterOptions() {
    this.searchMessage = "";
    let closeEventEmitter = new EventEmitter();
    let applyEventEmitter = new EventEmitter();

    const filterModal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: "filter-modal-css",
      componentProps: {
        clickClose: closeEventEmitter,
        applyFilter: applyEventEmitter,
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    closeEventEmitter.subscribe((res) => {
      filterModal.dismiss();
    });

    applyEventEmitter.subscribe((res) => {
      if (res) {
        this.searchMessage = `Results for Budget: ${res.budget.lower} - ${
          res.budget.upper
        } and interest: ${res.interest.join(",")}`;
      }
      // this.getPrograms("all", );
      filterModal.dismiss();
    });

    filterModal.onDidDismiss().then((data) => {
      console.log("closed");
    });

    return filterModal.present().then(() => {
      console.log(filterModal);
    });
  }

  async openFilter() {
    await this.menuController.open();
  }

  onChoiceUpdate(event) {
    this.getPrograms(event.detail.value);
    this.searchMessage = "";
  }

  navigateToDetail(programId: Number) {
    this.router.navigate(["../", programId], {
      queryParams: { catId: this.categoryId },
      relativeTo: this.route,
    });
  }
}
