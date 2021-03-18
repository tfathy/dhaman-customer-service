import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { PrimaryToolbarComponent } from "../components/primary-toolbar/primary-toolbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IonicSelectableModule } from 'ionic-selectable';



@NgModule({
  declarations: [PrimaryToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  exports: [
    PrimaryToolbarComponent,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule
  
  ],
})
export class SharedModule {}
