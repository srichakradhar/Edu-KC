import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { IonRange, IonCheckbox } from "@ionic/angular";
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';



@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  public form: FormGroup;
  public photoUrl: string ="https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  public userData: any;
  public interests = ["STEM", "Arts", "Sports"];
  public selectedInterestValues = [{}];
  public ages = [];
  public isParent = false;
  public isCommunity= false;
  public showDetailForm= false;
  public ageGroups = ['3-7', '8-14', '15-21', '21-30', '> 30']
  public userTypes = ['Student', 'Parent', 'Community Member']
  @ViewChild("budget", { static: true }) budget: IonRange;
  @ViewChild("interest", { static: true }) interest: IonCheckbox;

  constructor(public fAuth: AngularFireAuth, 
    private profileService: ProfileService, 
    private nativeStorage:NativeStorage, 
    private router: Router,
    private platform:Platform) {
    for(let i = 18; i <= 45; i++) {
      this.ages.push(i);
    }
  }

  ngOnInit() {
    this.getUser();
    this.buildProfileForm();
    // this.fAuth.authState.subscribe(user => {
    //   const userId = user.uid;
    //   console.log(userId)
    //   this.profileService.getProfileData().subscribe(profiles => {
    //     Object.keys(profiles).find(key => {
    //       console.log(profiles[key].user)
    //       return profiles[key].user == userId;
    //     })
    //     console.log(this.userData)
    //   })
    // })
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userData = user;
      // this.profileService.getProfileData().subscribe(res => {
      //   const profile = Object.keys(res).find(r => {
      //     return res[r].userId === user['userId']
      //   });
      //   this.userData = profile ? {...res[profile], existingUser: true, profileId: profile} : user;
      //   console.log(this.userData)
      //   this.setInitialValues();
      // })
    } else {
      this.router.navigate(['/account']);
    }
  }

  buildProfileForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      userType: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      address: new FormGroup({
        street: new FormControl(null, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        city: new FormControl(null, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        state: new FormControl(null, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        country: new FormControl(null, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        zipcode: new FormControl(null, {
          updateOn: "blur",
          validators: [Validators.required],
        })
      }),
      children: new FormArray([
      ]),
    });
    this.setInitialValues();
  }

  buildChildForm(userType) {
    const children = this.form.get('children') as FormArray;
    const child = new FormGroup({
      name: new FormControl(null, {
        updateOn: "blur",
        validators: [],
      }),
      gender: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      age: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      budget: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      interests: new FormControl([], {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    })
    userType === 'Student' ? child.get('name').clearValidators() : null;
    children.push(child);
  }

  buildCommunityForm() {
    const children = this.form.get('children') as FormArray;
    const communityForm = new FormGroup ({
      courseTitle: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      courseAge: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      courseFee: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      courseCategory: new FormControl([], {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    })
    children.push(communityForm);
  }

  setChildName(name, i){
    console.log(name)
    const children = this.getChildrenFormArray();
    children.controls[i].patchValue({
      name: name.value
    });
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  addChildForm() {
    this.buildChildForm("Parent");
  }

  setUserType(userType) {
    const children = this.getChildrenFormArray();
    this.clearFormArray(children);
    this.form.patchValue({
      userType: userType
    })
    if (userType==="Parent") {
      this.showDetailForm = true;
      this.isParent = true;
      this.buildChildForm(userType);
    }
    else if (userType=== "Student") {
      this.showDetailForm = true;
      this.isParent = false;
      this.buildChildForm(userType);
    } else {
      this.isParent = false;
      // this.buildCommunityForm();
      this.showDetailForm = false;
      this.isCommunity = true;
    }
    console.log(this.form.value)
  }
  setInitialValues() {
    this.setUserType(this.userData.userType ?  this.userData.userType : 'Student');
    if (this.userData) {
      this.form.patchValue({
        email : this.userData.email,
        name : this.userData.name ? this.userData.name : '',
        address : this.userData.address ? this.userData.address : '',
      })
      this.photoUrl = this.userData.photoUrl ? this.userData.photoUrl : this.photoUrl;
    }
  }

  setGenderValue(event, index) {
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      gender: event
    });
  }

  submitDetails() {
    const formData = {
      ...this.form.value,
      userId: this.userData.userId,
    }
    this.profileService.storeProfileData(formData).subscribe(res => {
      console.log(res)
    });
    if (!this.isCommunity) {
      this.router.navigate(['/categories']);
    } else {
      this.router.navigate(['/community-member']);
    }
  }

  getChildrenFormArray() {
    return this.form.get('children') as FormArray;
  }
  setAge(ageInput, index) {
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      age: ageInput.value
    });
    console.log(this.form.value)
  }
  setBudgetValue(rangeInput, index) {
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      budget: {lower: rangeInput.value.lower, upper: rangeInput.value.upper},
    });
  }

  setInterestValue(interestInput, index) {
    const children = this.getChildrenFormArray();
    const value = children.controls[index].get('interests').value;
    const position = value.indexOf(interestInput);
    if(position < 0) {
      value.push(interestInput)
    } else {
      value.splice(position, 1)
    }    
    children.controls[index].patchValue({
      interests:value,
    });
  }

  setProgramFee(fee, index){
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      courseFee: fee.value
    });
  }

  setCategory(category, index){
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      courseCategory: category.value
    });
  }

  setProgramName(progName, index){
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      courseTitle: progName.value
    });
  }


  setAgeGroup(ageGroup, index){
    const children = this.getChildrenFormArray();
    children.controls[index].patchValue({
      courseAge: ageGroup.value
    });
    console.log(this.form.value)
  }
}
