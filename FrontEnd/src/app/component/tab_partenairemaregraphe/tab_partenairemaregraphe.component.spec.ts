import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPartenaireMaregrapheComponent } from './tab_partenairemaregraphe.component';

describe('TabPartenairemaregrapheComponent', () => {
  let component: TabPartenaireMaregrapheComponent;
  let fixture: ComponentFixture<TabPartenaireMaregrapheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabPartenaireMaregrapheComponent]
    });
    fixture = TestBed.createComponent(TabPartenaireMaregrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});