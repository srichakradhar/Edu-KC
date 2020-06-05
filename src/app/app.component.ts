import { AngularFireAuth } from "angularfire2/auth";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;
  public userType;
  constructor(
    private platform: Platform,
    private fAuth: AngularFireAuth,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    
  
    });
  }

  ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      this.userType = profile.userType;
    }
  }

  onLogout() {
    this.fAuth.auth.signOut();
    this.router.navigate(["/account"]);
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    // Plugins.App.removeListener('appStateChange', this.checkAuthOnResume);
  }

}
