import { Component, OnInit } from '@angular/core';
import { getSessionInfo } from '../shared/shared/session.storage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit { 
  compNameA;
  compNameE;
  compRef;
  constructor() { }

  ngOnInit() {
    getSessionInfo("customer").then(data=>{ 
      this.compNameA = data.compNameA;
      this.compNameE = data.compNameE;
      this.compRef = data.compRef;
    })
  }

}
