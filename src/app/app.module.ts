import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared/shared.module";
import { AppStatusDetailComponent } from "./application-status/app-status-detail/app-status-detail.component";
import { ContractSummaryDtlComponent } from "./contract-summary/contract-summary-dtl/contract-summary-dtl.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CrmHttpInterceptor } from "./crm-http-interceptor";
import { OverdueShipmentDtlComponent } from "./overdue-shipment/overdue-shipment-dtl/overdue-shipment-dtl.component";
import { InsuredShipmetsDtlComponent } from "./isured-shipments/insured-shipmets-dtl/insured-shipmets-dtl.component";
import { ContractAnnexDtlComponent } from "./contract-annex/contract-annex-dtl/contract-annex-dtl.component";
import { AddDeclarationComponent } from "./declaration/add-declaration/add-declaration.component";

@NgModule({
  declarations: [
    AppComponent,
    AppStatusDetailComponent,
    ContractSummaryDtlComponent,
    OverdueShipmentDtlComponent,
    InsuredShipmetsDtlComponent,
    ContractAnnexDtlComponent,
    AddDeclarationComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CrmHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
