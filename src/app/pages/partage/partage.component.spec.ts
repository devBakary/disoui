import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageComponent } from './partage.component';

describe('PartageComponent', () => {
  let component: PartageComponent;
  let fixture: ComponentFixture<PartageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
