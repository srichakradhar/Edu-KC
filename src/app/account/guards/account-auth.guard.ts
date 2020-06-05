import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { AccountService } from "./../service/account.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
} from "@angular/router";
import { Observable } from "rxjs";
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: "root",
})
export class AccountAuthGuard implements CanActivate {
  constructor(private navtiveStorage: NativeStorage, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.navtiveStorage.getItem('user').then((user) => user ? true: false)
  }
}
