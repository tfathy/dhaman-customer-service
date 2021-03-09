import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  onLogin() {
    this.authService.isAuthorized = true;
    this.authService.getUserInfo().subscribe((data) => {
      const result = JSON.stringify({
        userId: "14",
        token: "token",
        tokenExpirationDate: "tokenExpirationDate",
        email: "tarek@dhaman.org",
        fullnameE: "Tarek Fathi Bakr",
        countryId: "102"
      });
      Plugins.Storage.set({ key: "authData", value: result });
      Plugins.Storage.set({ key: "data", value: "tarek" });    
      this.router.navigate(["/home"]);
    });
  }
}
