import { Component, OnInit, EventEmitter, Output, ViewChild } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.component.html",
  styleUrls: ["./filter-modal.component.scss"],
})
export class FilterModalComponent implements OnInit {
  public interests = ["STEM","Arts","Sports"];
  public budgetInitialValue = {lower: 0, upper: 0};
  public interestObj = [{name:"STEM", checked: false} , {name:"Arts", checked: false,},{name:"Sports", checked:false}];
  public interestvalue = [];
  public budgetValue = {};
  public applyDisabled = true;
  @Output() clickClose = new EventEmitter<any>();

  @Output() applyFilter = new EventEmitter<any>();

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.setFormValues();
  }

  setFormValues() {
    const profileData = JSON.parse(localStorage.getItem('profile'));
    if (profileData) {
      const interests = [...profileData['children'][0].interests];
      interests.forEach(i => {
        this.interestObj.map(e => {
          e.checked = e.name=== i ? true: false;
        })
      })
      this.interestObj.forEach(e => {
        if (e.checked) {
          this.setInterestValue(e.name);
        }
      })
      this.budgetValue = {...profileData.children[0].budget}
    }
  }

  modalClose() {
    this.clickClose.emit("OK");
  }

  filter() {
    this.applyFilter.emit({
      budget: this.budgetValue,
      interest: this.interestvalue
    });
  }

  setBudgetValue(rangeInput) {
    this.budgetValue = { ...rangeInput.value };
    console.log(this.budgetValue);
    this.applyDisabled = false;
    if (this.budgetValue['lower'] === 0 && this.budgetValue['upper'] === 10000) {
      this.applyDisabled = true;
    }
  }

  setInterestValue(interestInput) {
    this.applyDisabled = false;
    const index = this.interestvalue.indexOf(interestInput);
    if (index < 0) {
      this.interestvalue.push(interestInput);
    } else {
      this.interestvalue.splice(index, 1);
    }
    if (this.interestvalue.length === 0) {
      this.applyDisabled = true;
    }
    
  }
}
