import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { PrimaryToolbarComponent } from "../components/primary-toolbar/primary-toolbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import {  MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [PrimaryToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    PrimaryToolbarComponent,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class SharedModule {}
