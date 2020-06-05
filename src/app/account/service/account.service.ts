import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
// import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class AccountService {
  public url = 'https://hack-a-roo.firebaseio.com/users.json';
  private user: any;
  constructor(
    public platform: Platform,
    private fAuth: AngularFireAuth,
    private http: HttpClient
    // private nativeStorage: NativeStorage
  ) {
    // this.getUser();
  }

  getUser() {
    this.fAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user)
    });
  }
  
  saveUser(userData) {
    return this.http.post(this.url, userData);
  }

  getUserAuthState() {
    return this.fAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user)
    });
  }

  // storeUser() {
  //   this.platform.ready().then(() => {
  //     this.fAuth.authState.subscribe(user => {
  //       this.nativeStorage.setItem("user", user).then(
  //         () => console.log("Stored user!"),
  //         (error) => console.error("Error storing item", error)
  //       );
  //     })
  //   });
  // }

  // clearStorage() {
  //   this.platform.ready().then(() => {
  //     this.nativeStorage.clear().then(() => {
  //       console.log("cleared storage"),
  //       (err) => console.error('Error in clearing', err)
  //     });
  //   });
  // }
}
