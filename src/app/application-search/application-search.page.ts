import {  Component, OnInit} from "@angular/core";

import { Platform } from '@ionic/angular';


@Component({
  selector: "app-application-search",
  templateUrl: "./application-search.page.html",
  styleUrls: ["./application-search.page.scss"],
})
export class ApplicationSearchPage implements OnInit {
  ismobile = false;
  constructor(private platfrom: Platform) {}

  ngOnInit() {
    this.ismobile =this.platfrom.is('android') || this.platfrom.is('ios');
    console.log(this.ismobile);
  
  }
 
 
}
