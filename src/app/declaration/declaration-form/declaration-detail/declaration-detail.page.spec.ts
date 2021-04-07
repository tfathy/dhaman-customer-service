import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeclarationDetailPage } from './declaration-detail.page';

describe('DeclarationDetailPage', () => {
  let component: DeclarationDetailPage;
  let fixture: ComponentFixture<DeclarationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeclarationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
