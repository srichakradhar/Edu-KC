import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShortlistPage } from './shortlist.page';

describe('ShortlistPage', () => {
  let component: ShortlistPage;
  let fixture: ComponentFixture<ShortlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShortlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
