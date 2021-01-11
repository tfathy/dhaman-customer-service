import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeclarationPage } from './declaration.page';

describe('DeclarationPage', () => {
  let component: DeclarationPage;
  let fixture: ComponentFixture<DeclarationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeclarationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
