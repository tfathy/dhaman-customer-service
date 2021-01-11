import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { ApplicationService } from 'src/app/services/application.service';
import { IApplication } from 'src/app/shared/models/application.model';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
applicationData: IApplication[]=[];
  constructor(private applicationService: ApplicationService, private router: Router) { }

  ngOnInit() {
   console.log('ng on init');  
   this.applicationService.getAll().subscribe(
     data =>{
       console.log(data);
       this.applicationData=(data);
     }
   );
  }

  onEdit(applicationId, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'application-search','application-form', applicationId]);    
  }
  createApp(){
    this.router.navigate(['/','application-search', 'application-form']);   
  }
}
