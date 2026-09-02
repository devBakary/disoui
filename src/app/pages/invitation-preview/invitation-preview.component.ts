import { Component, OnInit } from '@angular/core';
import { Invitation, InvitationService } from '../../services/invitation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitation-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation-preview.component.html',
  styleUrl: './invitation-preview.component.scss'
})
export class InvitationPreviewComponent implements OnInit {

  invitation: Invitation | null = null;

  constructor(
    private invitationService: InvitationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.invitation =
      this.invitationService.getInvitation();

    if (!this.invitation) {
      this.router.navigate(['/create-invitation']);
    }

  }

  editInvitation(): void {
    this.router.navigate(['/create-invitation']);
  }

async createLink(): Promise<void> {

  if (!this.invitation) {
    return;
  }

  // Génération d'un identifiant unique
  const id = Math.random()
    .toString(36)
    .substring(2, 8);

  try {

    // Enregistrement dans Firestore
    await this.invitationService.saveInvitation(
      id,
      this.invitation
    );

    console.log(
      'Invitation enregistrée avec succès :',
      id
    );

    // Aller vers la page qui affiche le lien
    this.router.navigate([
      '/partage',
      id
    ]);

  } catch (error) {

    console.error(
      'Erreur lors de la création de l’invitation :',
      error
    );

  }

}


}
