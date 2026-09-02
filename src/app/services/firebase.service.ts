
import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { environment } from '../../environnement/environnement';


@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private app = initializeApp(
        environment.firebase
    );

    public db = getFirestore(
        this.app
    );

}
