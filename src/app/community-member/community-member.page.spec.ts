import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommunityMemberPage } from './community-member.page';

describe('CommunityMemberPage', () => {
  let component: CommunityMemberPage;
  let fixture: ComponentFixture<CommunityMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
