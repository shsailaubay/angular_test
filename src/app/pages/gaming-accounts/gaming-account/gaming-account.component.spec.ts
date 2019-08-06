import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingAccountComponent } from './gaming-account.component';

describe('GamingAccountComponent', () => {
  let component: GamingAccountComponent;
  let fixture: ComponentFixture<GamingAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamingAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
