import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeclarationFormPage } from './declaration-form.page';

describe('DeclarationFormPage', () => {
  let component: DeclarationFormPage;
  let fixture: ComponentFixture<DeclarationFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeclarationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
