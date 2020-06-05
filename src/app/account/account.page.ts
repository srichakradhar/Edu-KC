import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { LoadingController, AlertController } from "@ionic/angular";

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AccountService } from './service/account.service';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit {
  public user: User = new User();
  public isLogin = false;
  @ViewChild("f") form: NgForm;
  constructor(
    private authService: AuthService,
    public fAuth: AngularFireAuth,  
    public googlePlus: GooglePlus,
    public router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    // this.accountService.clearStorage();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
    this.form.reset();
  }

  logInWithGoogle(): void {
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .signIn(GoogleLoginProvider.PROVIDER_ID)
          .then((resp) => {
            loadingEl.dismiss();
            const data = {
              userId: resp['id'],
              name: resp['name'],
              email: resp['email'],
              photoUrl: resp['photoUrl'],
              socialLogin: true
            }
            this.storeLoggedInUser(data);
            this.router.navigateByUrl("/profile");
          });
      });
  }

  // logInWithGoogle() {
  //   this.googlePlus
  //     .login({
  //       webClientId:
  //         "204763377740-2b4t9mjmjd4v9tqcno5s0e69egbrtcb1.apps.googleusercontent.com",
  //       offline: true,
  //     })
  //     .then((res) => {
  //       firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
  //       .then( success => {
  //         console.log("Firebase success:");
  //         // this.accountService.storeUser();
  //         // firebase.auth.AdditionalUserInfo
  //         this.router.navigate(['/programs'])
  //       })
  //       .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
  //     }).catch(err => console.error("Error: ", err));
  // }

  async register(form) {
    const loadingElement = await this.loadingCtrl.create({
      message: "Creating user.. wait",
      keyboardClose: true,
    });
    try {
      loadingElement.present();
      this.user = { ...form.value };
      const r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        const data = {
          userId: r['user']['uid'],
          email:  r['user']['email'],
          socialLogin: false
        }
        this.storeLoggedInUser(data);
        this.accountService.saveUser(data).subscribe(res => {
          console.log(res);
          loadingElement.dismiss();
          console.log("registerd")
          this.router.navigate(["/profile"]);
        })
        // this.isLogin = true;
        // form.reset();
        // const alertElement = await this.alertCtrl.create({
        //   message: "User created sucessfully.",
        //   buttons: [{
        //     text: 'Okay',
        //     handler: () => {
        //       console.log('Confirm Okay');
        //       this.router.navigate(["/profile"]);
        //     }
        //   }]
        // });
        // alertElement.present();
      }
    } catch (err) {
      loadingElement.dismiss();
      const alertElement = await this.alertCtrl.create({
        message: err.message,
        buttons: ["OK"],
      });
      alertElement.present();
    }
  }

  async login(form) {
    const loadingElement = await this.loadingCtrl.create({
      message: "Logging in...please wait",
      keyboardClose: true,
    });
    this.user = { ...form.value };
    try {
      loadingElement.present();
      const r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        const data = {
          userId: r['user']['uid'],
          email:  r['user']['email'],
          socialLogin: false
        }
        this.storeLoggedInUser(data);
        loadingElement.dismiss();
        this.router.navigate(["/categories"]);
      }
    } catch (err) {
      loadingElement.dismiss();
      const alertElement = await this.alertCtrl.create({
        message: err.message,
        buttons: ["OK"],
      });
      alertElement.present();
    }
  }

  storeLoggedInUser(data) {
    localStorage.setItem("user", JSON.stringify(data))
  }
}
