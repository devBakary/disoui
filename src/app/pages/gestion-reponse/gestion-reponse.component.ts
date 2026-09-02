import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invitation, InvitationResponse, InvitationService } from '../../services/invitation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-reponse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-reponse.component.html',
  styleUrl: './gestion-reponse.component.scss'
})
export class GestionReponseComponent implements OnInit {

  // =========================================================
  // INVITATION
  // =========================================================

  invitation: Invitation | null = null;


  // =========================================================
  // RÉPONSE
  // =========================================================

  response: InvitationResponse | null = null;


  // =========================================================
  // ÉTATS
  // =========================================================

  loading = true;

  error = false;


  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService
  ) {}


  // =========================================================
  // INITIALISATION
  // =========================================================

  async ngOnInit(): Promise<void> {

    const id =
      this.route.snapshot.paramMap.get('id');


    if (!id) {

      this.loading = false;
      this.error = true;

      return;

    }


    try {

      // -------------------------------------------------------
      // RÉCUPÉRER L'INVITATION
      // -------------------------------------------------------

      this.invitation =
        await this.invitationService
          .getInvitationById(id);


      if (!this.invitation) {

        this.error = true;

        return;

      }


      // -------------------------------------------------------
      // RÉCUPÉRER LA RÉPONSE
      // -------------------------------------------------------

      this.response =
        await this.invitationService
          .getResponse(id);


      console.log(
        'Invitation :',
        this.invitation
      );


      console.log(
        'Réponse :',
        this.response
      );


    } catch (error) {

      console.error(
        'Erreur lors du chargement :',
        error
      );

      this.error = true;

    } finally {

      this.loading = false;

    }

  }

}
