import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AccountPageRoutingModule } from "./account-routing.module";

import { AccountPage } from "./account.page";

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("204763377740-2b4t9mjmjd4v9tqcno5s0e69egbrtcb1.apps.googleusercontent.com")
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountPageRoutingModule,SocialLoginModule],
  declarations: [AccountPage],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class AccountPageModule {}
