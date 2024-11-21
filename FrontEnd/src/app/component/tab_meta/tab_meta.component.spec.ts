import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMetaComponent } from './tab_meta.component';

describe('TabMetaComponent', () => {
  let component: TabMetaComponent;
  let fixture: ComponentFixture<TabMetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabMetaComponent]
    });
    fixture = TestBed.createComponent(TabMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
