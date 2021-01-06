import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-toolbar',
  templateUrl: './primary-toolbar.component.html',
  styleUrls: ['./primary-toolbar.component.scss'],
})
export class PrimaryToolbarComponent implements OnInit {
  @Input() moduleTitle = 'Module title here';
  @Input() opTitle = 'Operating unit here';
  @Input() showHomeButton = false;
  @Input() showMainMenuButton = false;
  @Input() showBackButton = false;
  @Input() backUrl: string;
  constructor() { }

  ngOnInit() {}

}
