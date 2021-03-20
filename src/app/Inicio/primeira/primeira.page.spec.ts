import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimeiraPage } from './primeira.page';

describe('PrimeiraPage', () => {
  let component: PrimeiraPage;
  let fixture: ComponentFixture<PrimeiraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeiraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimeiraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
