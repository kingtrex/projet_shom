import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPartenaireComponent } from './tab-partenaire.component';

describe('TabPartenaireComponent', () => {
  let component: TabPartenaireComponent;
  let fixture: ComponentFixture<TabPartenaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabPartenaireComponent]
    });
    fixture = TestBed.createComponent(TabPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
