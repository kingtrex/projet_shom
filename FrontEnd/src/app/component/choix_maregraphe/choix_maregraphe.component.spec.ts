import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixMaregrapheComponent } from './choix_maregraphe.component';

describe('ChoixMaregrapheComponent', () => {
  let component: ChoixMaregrapheComponent;
  let fixture: ComponentFixture<ChoixMaregrapheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixMaregrapheComponent]
    });
    fixture = TestBed.createComponent(ChoixMaregrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
