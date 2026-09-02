import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Invitation,
  InvitationResponse,
  InvitationService
} from '../../services/invitation.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reponse',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './reponse.component.html',
  styleUrl: './reponse.component.scss'
})


export class ReponseComponent implements OnInit {


  // =========================================================
  // INVITATION
  // =========================================================

  invitation: Invitation | null = null;


  // =========================================================
  // ÉTAPES
  // =========================================================

  /**
   * 1 = Question
   * 2 = Proposition
   * 3 = Date et heure
   * 4 = Confirmation
   */

  currentStep = 1;


  // =========================================================
  // RÉPONSE
  // =========================================================

  answer: 'yes' | 'no' | null = null;

  selectedTime: string | null = null;

  responseMessage = '';


  // =========================================================
  // RÉPONSE EXISTANTE
  // =========================================================

  responseAlreadySent = false;

  existingResponse: InvitationResponse | null = null;


  // =========================================================
  // ÉTAT D'ENVOI
  // =========================================================

  isSending = false;

  responseSent = false;


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

      return;

    }


    try {

      // -------------------------------------------------------
      // 1. RÉCUPÉRER L'INVITATION
      // -------------------------------------------------------

      this.invitation =
        await this.invitationService
          .getInvitationById(id);


      console.log(
        'Invitation récupérée depuis Firestore :',
        this.invitation
      );


      // -------------------------------------------------------
      // 2. VÉRIFIER SI UNE RÉPONSE EXISTE DÉJÀ
      // -------------------------------------------------------

      const existingResponse =
        await this.invitationService
          .getResponse(id);


      if (existingResponse) {

        this.existingResponse =
          existingResponse;

        this.responseAlreadySent =
          true;

        console.log(
          'Une réponse existe déjà :',
          existingResponse
        );

      }


    } catch (error) {

      console.error(
        'Erreur lors du chargement de l’invitation :',
        error
      );

    }

  }


  // =========================================================
  // ÉTAPE 1
  // =========================================================

  chooseYes(): void {

    // Sécurité supplémentaire
    if (this.responseAlreadySent) {
      return;
    }

    this.answer = 'yes';

    this.currentStep = 2;

  }


  chooseNo(): void {

    // Sécurité supplémentaire
    if (this.responseAlreadySent) {
      return;
    }

    this.answer = 'no';

    this.currentStep = 4;

  }


  // =========================================================
  // ÉTAPE 2
  // =========================================================

  continueToDate(): void {

    if (this.responseAlreadySent) {
      return;
    }

    this.currentStep = 3;

  }


  // =========================================================
  // ÉTAPE 3
  // =========================================================

  getAvailableTimes(): string[] {

    if (!this.invitation) {

      return [];

    }


    return [

      this.invitation.time1,

      this.invitation.time2,

      this.invitation.time3

    ].filter(

      (time): time is string =>
        !!time

    );

  }


  chooseTime(
    time: string
  ): void {

    if (this.responseAlreadySent) {
      return;
    }

    this.selectedTime = time;

  }


  continueToConfirmation(): void {

    if (this.responseAlreadySent) {

      return;

    }


    if (!this.selectedTime) {

      return;

    }


    this.currentStep = 4;

  }


  // =========================================================
  // RETOUR
  // =========================================================

  goBack(): void {

    if (this.responseAlreadySent) {
      return;
    }


    if (this.currentStep > 1) {

      this.currentStep--;

    }

  }


  // =========================================================
  // ENVOI DE LA RÉPONSE
  // =========================================================

  async sendResponse(): Promise<void> {


    // -------------------------------------------------------
    // SÉCURITÉ : UNE RÉPONSE EXISTE DÉJÀ
    // -------------------------------------------------------

    if (this.responseAlreadySent) {

      console.log(
        'Cette invitation a déjà reçu une réponse.'
      );

      return;

    }


    const invitationId =
      this.route.snapshot.paramMap.get('id');


    if (!invitationId) {

      return;

    }


    if (!this.answer) {

      return;

    }


    if (this.isSending) {

      return;

    }


    this.isSending = true;


    const response: InvitationResponse = {

      invitationId:

        invitationId,

      answer:

        this.answer,

      selectedTime:

        this.selectedTime,

      message:

        this.responseMessage,

      respondedAt:

        new Date().toISOString()

    };


    try {


      await this.invitationService
        .saveResponse(response);


      console.log(
        'Réponse envoyée avec succès ❤️',
        response
      );


      // -----------------------------------------------------
      // CONSERVER LA RÉPONSE
      // -----------------------------------------------------

      this.existingResponse =
        response;


      this.responseAlreadySent =
        true;


      this.responseSent =
        true;


    } catch (error) {


      console.error(
        'Erreur lors de l’enregistrement de la réponse :',
        error
      );


    } finally {

      this.isSending = false;

    }

  }

}