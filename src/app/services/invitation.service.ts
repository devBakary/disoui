
import { Injectable } from '@angular/core';

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { FirebaseService } from './firebase.service';


// =========================================================
// INTERFACE INVITATION
// =========================================================

export interface Invitation {

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


// =========================================================
// INTERFACE RÉPONSE
// =========================================================

export interface InvitationResponse {

  invitationId: string;

  answer: 'yes' | 'no';

  selectedTime: string | null;

  message: string;

  respondedAt: string;
}


// =========================================================
// SERVICE
// =========================================================

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private invitation: Invitation | null = null;


  constructor(
    private firebaseService: FirebaseService
  ) {}


  // =======================================================
  // INVITATION COURANTE
  // =======================================================

  setInvitation(
    invitation: Invitation
  ): void {

    this.invitation = {
      ...invitation
    };

  }


  getInvitation(): Invitation | null {

    return this.invitation;

  }


  clearInvitation(): void {

    this.invitation = null;

  }


  // =======================================================
  // SAUVEGARDER UNE INVITATION
  // =======================================================

  async saveInvitation(
    id: string,
    invitation: Invitation
  ): Promise<void> {

    const invitationRef = doc(
      this.firebaseService.db,
      'invitations',
      id
    );


    await setDoc(
      invitationRef,
      {
        ...invitation
      }
    );


    console.log(
      'Invitation enregistrée dans Firestore :',
      id
    );

  }


  // =======================================================
  // RÉCUPÉRER UNE INVITATION
  // =======================================================

  async getInvitationById(
    id: string
  ): Promise<Invitation | null> {

    const invitationRef = doc(
      this.firebaseService.db,
      'invitations',
      id
    );


    const snapshot = await getDoc(
      invitationRef
    );


    if (!snapshot.exists()) {

      console.log(
        'Invitation introuvable :',
        id
      );

      return null;

    }


    return snapshot.data() as Invitation;

  }


  // =======================================================
  // ENREGISTRER UNE RÉPONSE
  // =======================================================

  async saveResponse(
    response: InvitationResponse
  ): Promise<void> {

    const responseRef = doc(
      this.firebaseService.db,
      'responses',
      response.invitationId
    );


    await setDoc(
      responseRef,
      {
        ...response
      }
    );


    console.log(
      'Réponse enregistrée dans Firestore :',
      response
    );

  }


  // =======================================================
  // RÉCUPÉRER UNE RÉPONSE
  // =======================================================

  async getResponse(
    invitationId: string
  ): Promise<InvitationResponse | null> {

    const responseRef = doc(
      this.firebaseService.db,
      'responses',
      invitationId
    );


    const snapshot = await getDoc(
      responseRef
    );


    if (!snapshot.exists()) {

      console.log(
        'Aucune réponse trouvée pour cette invitation'
      );

      return null;

    }


    return snapshot.data() as InvitationResponse;

  }

}
