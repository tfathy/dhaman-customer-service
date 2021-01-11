import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserName().subscribe(
      data=>{
        this._userName = data;
      }
    );
    this.authService.getCompanyName().subscribe(
      data =>{
        this._companyName = data;
      }
    )
  }

}
