import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService:AuthService,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  logOut(){
    const promise1 = Promise.resolve(Storage.remove({ key: "authData" }));
    const promise2 = Promise.resolve(Storage.remove({ key: "customer" }));
    this.loadingCtrl.create({
      message: 'log out ..'
    }).then(loadingElmnt=>{
      loadingElmnt.present();
       Promise.all([promise1,promise2]).then(data=>{      
       this.authService.logout();
       this.router.navigateByUrl('/login');
       loadingElmnt.dismiss();
    });
    })
   
  }
}
