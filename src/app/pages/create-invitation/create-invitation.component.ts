import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvitationService } from '../../services/invitation.service';

interface Invitation {
  creatorName: string;
  recipientName: string;
  message: string;
  activity: string;
  location: string;
  date: string;
  time1: string;
  time2: string;
  time3: string;
}

@Component({
  selector: 'app-create-invitation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-invitation.component.html',
  styleUrl: './create-invitation.component.scss'
})
export class CreateInvitationComponent {

 currentStep = 1;

  invitation: Invitation = {
    creatorName: '',
    recipientName: '',
    message: '',
    activity: '',
    location: '',
    date: '',
    time1: '',
    time2: '',
    time3: ''
  };

  constructor(private router: Router,
              private invitationService: InvitationService
  ) {}

  nextStep(): void {

    if (this.currentStep < 3) {
      this.currentStep++;
    }

  }

  previousStep(): void {

    if (this.currentStep > 1) {
      this.currentStep--;
    }

  }

  isStep1Valid(): boolean {

    return !!(
      this.invitation.creatorName.trim() &&
      this.invitation.recipientName.trim() &&
      this.invitation.message.trim()
    );

  }

  isStep2Valid(): boolean {

    return !!(
      this.invitation.activity.trim() &&
      this.invitation.location.trim()
    );

  }

  isStep3Valid(): boolean {

    return !!(
      this.invitation.date &&
      this.invitation.time1
    );

  }

  createInvitation(): void {

    if (!this.isStep3Valid()) {
      return;
    }

    // Sauvegarde temporaire
    this.invitationService.setInvitation(this.invitation);

    // Aller vers l'aperçu
    this.router.navigate(['/preview']);
  }

  goBack(): void {

    this.router.navigate(['/']);

  }

}
