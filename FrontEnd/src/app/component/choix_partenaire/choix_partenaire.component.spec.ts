
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixPartenaireComponent } from './choix_partenaire.component';

describe('TabPartenaireComponent', () => {
  let component: ChoixPartenaireComponent;
  let fixture: ComponentFixture<ChoixPartenaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixPartenaireComponent]
    });
    fixture = TestBed.createComponent(ChoixPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
