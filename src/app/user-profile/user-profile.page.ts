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
  username;
  coushortnamee;
  comppoboxe;
  compfax;
  compcitye;
  userId;
  comptel;
  comptel2;
  compwebaddress;
  constructor() { }

  ngOnInit() {
    getSessionInfo("customer").then(data=>{ 
      this.compNameA = data.compNameA;
      this.compNameE = data.compNameE;
      this.compRef = data.compRef;
      this.username = data.loginName;
      this.coushortnamee = data.coushortnamee;
      this.compcitye = data.compcitye;
      this.compfax = data.compfax;
      this.comppoboxe = data.comppoboxe;
      this.comptel = data.comptel;
      this.comptel2 = data.comptel2;
      this.compwebaddress = data.compwebaddress;
    })
    getSessionInfo("authData").then(data=>{      
      this.username = data.loginName;
      this.userId = data.userid;
    })
  }

}
