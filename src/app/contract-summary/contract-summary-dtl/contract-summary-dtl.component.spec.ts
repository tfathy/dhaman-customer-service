import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractSummaryDtlComponent } from './contract-summary-dtl.component';

describe('ContractSummaryDtlComponent', () => {
  let component: ContractSummaryDtlComponent;
  let fixture: ComponentFixture<ContractSummaryDtlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSummaryDtlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractSummaryDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
