
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
  // CHARGEMENT
  // =========================================================

  isLoading = true;


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


  // =========================================================
  // CONSTRUCTEUR
  // =========================================================

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService
  ) {}


  // =========================================================
  // INITIALISATION
  // =========================================================

  async ngOnInit(): Promise<void> {

    // -------------------------------------------------------
    // Initialiser l'état
    // -------------------------------------------------------

    this.isLoading = true;

    this.invitation = null;

    this.responseAlreadySent = false;

    this.existingResponse = null;

    this.responseSent = false;


    // -------------------------------------------------------
    // Récupérer l'ID dans l'URL
    // -------------------------------------------------------

    const id =
      this.route.snapshot.paramMap.get('id');


    // -------------------------------------------------------
    // Aucun ID
    // -------------------------------------------------------

    if (!id) {

      console.error(
        'Aucun identifiant d’invitation dans l’URL.'
      );

      this.isLoading = false;

      return;

    }


    try {

      // =====================================================
      // 1. RÉCUPÉRER L'INVITATION
      // =====================================================

      const invitation =
        await this.invitationService
          .getInvitationById(id);


      console.log(
        'Invitation récupérée depuis Firestore :',
        invitation
      );


      // -------------------------------------------------------
      // Invitation inexistante
      // -------------------------------------------------------

      if (!invitation) {

        console.warn(
          'Invitation introuvable :',
          id
        );

        this.invitation = null;

        return;

      }


      // -------------------------------------------------------
      // Invitation trouvée
      // -------------------------------------------------------

      this.invitation = invitation;


      // =====================================================
      // 2. VÉRIFIER SI UNE RÉPONSE EXISTE DÉJÀ
      // =====================================================

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

      this.invitation = null;

    } finally {

      // =====================================================
      // FIN DU CHARGEMENT
      // =====================================================

      this.isLoading = false;

    }

  }


  // =========================================================
  // ÉTAPE 1 — OUI
  // =========================================================

  chooseYes(): void {

    if (this.responseAlreadySent) {
      return;
    }

    this.answer = 'yes';

    this.currentStep = 2;

  }


  // =========================================================
  // ÉTAPE 1 — NON
  // =========================================================

  chooseNo(): void {

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
  // ÉTAPE 3 — HORAIRES
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


  // =========================================================
  // CHOISIR UNE HEURE
  // =========================================================

  chooseTime(
    time: string
  ): void {

    if (this.responseAlreadySent) {
      return;
    }

    this.selectedTime = time;

  }


  // =========================================================
  // CONTINUER VERS CONFIRMATION
  // =========================================================

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
  // ENVOYER LA RÉPONSE
  // =========================================================

  async sendResponse(): Promise<void> {


    // -------------------------------------------------------
    // Une réponse existe déjà
    // -------------------------------------------------------

    if (this.responseAlreadySent) {

      console.log(
        'Cette invitation a déjà reçu une réponse.'
      );

      return;

    }


    // -------------------------------------------------------
    // Récupérer l'ID
    // -------------------------------------------------------

    const invitationId =
      this.route.snapshot.paramMap.get('id');


    if (!invitationId) {

      console.error(
        'ID de l’invitation manquant.'
      );

      return;

    }


    // -------------------------------------------------------
    // Vérifier la réponse
    // -------------------------------------------------------

    if (!this.answer) {

      console.error(
        'Aucune réponse sélectionnée.'
      );

      return;

    }


    // -------------------------------------------------------
    // Empêcher le double clic
    // -------------------------------------------------------

    if (this.isSending) {
      return;
    }


    this.isSending = true;


    // -------------------------------------------------------
    // Préparer la réponse
    // -------------------------------------------------------

    const response: InvitationResponse = {

      invitationId:

        invitationId,

      answer:

        this.answer,

      selectedTime:

        this.selectedTime,

      message:

        this.responseMessage.trim(),

      respondedAt:

        new Date().toISOString()

    };


    try {

      // =====================================================
      // ENREGISTRER DANS FIRESTORE
      // =====================================================

      await this.invitationService
        .saveResponse(response);


      console.log(
        'Réponse enregistrée dans Firestore :',
        response
      );


      // =====================================================
      // METTRE À JOUR L'INTERFACE
      // =====================================================

      this.existingResponse =
        response;


      this.responseSent =
        true;


      this.responseAlreadySent =
        true;


      console.log(
        'Réponse envoyée avec succès ❤️',
        response
      );


    } catch (error) {

      console.error(
        'Erreur lors de l’enregistrement de la réponse :',
        error
      );


    } finally {

      this.isSending =
        false;

    }

  }

}
