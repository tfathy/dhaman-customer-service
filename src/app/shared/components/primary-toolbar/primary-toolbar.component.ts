import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { sessionData } from '../../shared/session.storage';

@Component({
  selector: 'app-primary-toolbar',
  templateUrl: './primary-toolbar.component.html',
  styleUrls: ['./primary-toolbar.component.scss'],
})
export class PrimaryToolbarComponent implements OnInit {
  @Input() moduleTitle = 'Module title here';
  _companyName = '';
  _userName;
  @Input() showHomeButton = false;
  @Input() showMainMenuButton = false;
  @Input() showBackButton = false;
  @Input() backUrl: string;

  authToken: sessionData;

  constructor(private router: Router) { }

  ngOnInit() {
    this._companyName = sessionStorage.getItem("compNameE");
    this._userName = sessionStorage.getItem("loginName");
  
  }
  goHome(){
    this.router.navigate(['/home']);
  }
}
