import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { IApplication } from 'src/app/shared/models/application.model';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
applicationData: IApplication[]=[];
  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.applicationService.getAll().subscribe(
      data =>{
        this.applicationData = data as IApplication[];
      }
    );

  }

}
