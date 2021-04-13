import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsuredShipmetsDtlComponent } from './insured-shipmets-dtl.component';

describe('InsuredShipmetsDtlComponent', () => {
  let component: InsuredShipmetsDtlComponent;
  let fixture: ComponentFixture<InsuredShipmetsDtlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredShipmetsDtlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsuredShipmetsDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
