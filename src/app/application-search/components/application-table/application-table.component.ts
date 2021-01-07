import { Component, OnInit, ViewChild } from "@angular/core";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { ApplicationService } from "src/app/services/application.service";
import { IApplication } from "src/app/shared/models/application.model";

const ELEMENT_DATA: IApplication[] = [];
@Component({
  selector: "app-application-table",
  templateUrl: "./application-table.component.html",
  styleUrls: ["./application-table.component.scss"],
})
export class ApplicationTableComponent implements OnInit {
  displayedColumns: string[] = [
    "buyerNameAr",
    "buyerNameEn",
    "address",
    "phone",
    "comNumber",
    "vat",
    "avgShipment",
    "crLimit",
    "tenorDays",
    "payMode",
    "buyerBank",
    "email",
    "fax",
  ];
  dataSource = new MatTableDataSource<IApplication>(ELEMENT_DATA);
  selection = new SelectionModel<IApplication>(false, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.applicationService.getAll().subscribe((data) => {
      console.log("table data:", data);
      this.dataSource.data = data as IApplication[];
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
