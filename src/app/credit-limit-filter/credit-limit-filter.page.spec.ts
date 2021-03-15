import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditLimitFilterPage } from './credit-limit-filter.page';

describe('CreditLimitFilterPage', () => {
  let component: CreditLimitFilterPage;
  let fixture: ComponentFixture<CreditLimitFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditLimitFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditLimitFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
