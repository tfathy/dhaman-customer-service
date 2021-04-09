import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-app-status-detail',
  templateUrl: './app-status-detail.component.html',
  styleUrls: ['./app-status-detail.component.scss'],
})
export class AppStatusDetailComponent implements OnInit {
@Input() applicationNo: number;
@Input() cntDescription: string;
@Input() applicationDate: Date;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onDismiss(){
    this.modalCtrl.dismiss();
  }

}
