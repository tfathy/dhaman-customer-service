import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditLimitFormPage } from './credit-limit-form.page';

describe('CreditLimitFormPage', () => {
  let component: CreditLimitFormPage;
  let fixture: ComponentFixture<CreditLimitFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditLimitFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditLimitFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
