import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReponseComponent } from './gestion-reponse.component';

describe('GestionReponseComponent', () => {
  let component: GestionReponseComponent;
  let fixture: ComponentFixture<GestionReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionReponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
