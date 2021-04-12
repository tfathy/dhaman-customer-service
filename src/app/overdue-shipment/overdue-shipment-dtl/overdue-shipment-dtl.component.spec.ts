import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverdueShipmentDtlComponent } from './overdue-shipment-dtl.component';

describe('OverdueShipmentDtlComponent', () => {
  let component: OverdueShipmentDtlComponent;
  let fixture: ComponentFixture<OverdueShipmentDtlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverdueShipmentDtlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OverdueShipmentDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
