import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ApplicationService } from "src/app/services/application.service";
import { IApplication } from "src/app/shared/models/application.model";
import {  map, tap } from "rxjs/operators";

@Component({
  selector: "app-application-form",
  templateUrl: "./application-form.page.html",
  styleUrls: ["./application-form.page.scss"],
})
export class ApplicationFormPage implements OnInit {
  app={
    buyerNameAr:'',
    buyerNameEn:'',
    address:'',
    phone:'',
    comNumber:'',
    vat:0,
    avgShipment:0,
    crLimit:0,
    tenorDays:0,
    payMode:'',
    buyerBank:'',
    email:'',
    fax:'',

  }
  title='New Application';
  selectedApplication: IApplication;
  applications: IApplication[] = [];
  applicationId;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.route.paramMap.subscribe((param) => {
      this.applicationId = param.get("applicationId");
    });
    console.log(this.applicationId);
    this.applicationService
      .getAll()
      .pipe(
        map((items) => items.filter((item) => item.id === this.applicationId))
        ,tap( row =>{console.log(row)})
      )
      .subscribe(data=>{
        console.log(data);
      });
  }

  getApplication(id: number) {
    return this.applications.find((app: any) => app.id === id);
  }

}
