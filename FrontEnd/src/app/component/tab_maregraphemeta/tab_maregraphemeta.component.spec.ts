import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMaregraphemetaComponent } from './tab_maregraphemeta.component';

describe('TabMaregraphemetaComponent', () => {
  let component: TabMaregraphemetaComponent;
  let fixture: ComponentFixture<TabMaregraphemetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabMaregraphemetaComponent]
    });
    fixture = TestBed.createComponent(TabMaregraphemetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
