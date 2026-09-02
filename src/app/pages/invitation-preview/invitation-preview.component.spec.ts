import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPreviewComponent } from './invitation-preview.component';

describe('InvitationPreviewComponent', () => {
  let component: InvitationPreviewComponent;
  let fixture: ComponentFixture<InvitationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
