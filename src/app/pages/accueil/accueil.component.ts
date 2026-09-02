import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

   constructor(private router: Router) {}

  createInvitation(): void {
    this.router.navigate(['/create-invitation']);
  }

}
