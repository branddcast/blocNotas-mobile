import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowNotePage } from './show-note.page';

describe('ShowNotePage', () => {
  let component: ShowNotePage;
  let fixture: ComponentFixture<ShowNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
