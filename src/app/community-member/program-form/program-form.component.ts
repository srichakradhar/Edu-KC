import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.scss'],
})
export class ProgramFormComponent implements OnInit {
  public ages = ['3-7', '8-14', '15-21', '21-30', '> 30'];
  public categories = ["STEM", "Arts", "Sports"];
  public programData:any = {}
  @Output() clickClose = new EventEmitter<any>();

  @Output() clickSave = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  modalClose() {
    this.clickClose.emit("OK");
  }

  save() {
    this.clickSave.emit(this.programData);
    localStorage.setItem('program', JSON.stringify(this.programData))
  }

  setGender(value){
    this.programData['gender'] = value
  }

  setTitleValue(value){
    this.programData['title'] = value;
  }

  setCourseDes(value){
    console.log(value)
    this.programData['desc'] = value;
  }

  setCategory(value){
    this.programData['category'] = value;
  }

  setFeeValue(value){
    this.programData['fee'] = value;
  }

  setAgeGroup(value){
    this.programData['ageGroup'] = value;
  }

  setLocation(value){
    this.programData['location'] = value;
  }

}
