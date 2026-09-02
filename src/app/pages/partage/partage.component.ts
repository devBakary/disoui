import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-partage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partage.component.html',
  styleUrl: './partage.component.scss'
})
export class PartageComponent implements OnInit {

  invitationId: string = '';
  invitationLink: string = '';
  copied: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.invitationId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.invitationId) {
      this.router.navigate(['/home']);
      return;
    }

    // Création du lien public de réponse
    this.invitationLink =
      `${window.location.origin}/reponse/${this.invitationId}`;
  }


  // =====================================================
  // COPIER LE LIEN
  // =====================================================

  async copyLink(): Promise<void> {

    try {

      await navigator.clipboard.writeText(
        this.invitationLink
      );

      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 2500);

    } catch (error) {

      console.error(
        'Impossible de copier le lien :',
        error
      );

    }
  }


  // =====================================================
  // PARTAGER SUR WHATSAPP
  // =====================================================

  shareWhatsApp(): void {

    const message =
      `💕 J'ai une petite invitation pour toi...\n\n` +
      `Clique ici pour la découvrir ❤️\n\n` +
      `${this.invitationLink}`;

    const whatsappUrl =
      `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      '_blank'
    );
  }
  manageInvitation(): void {

    if (!this.invitationId) {
      return;
    }

    this.router.navigate([
      '/gestion',
      this.invitationId
    ]);

  }

  // =====================================================
  // RETOUR
  // =====================================================

  backToPreview(): void {

    this.router.navigate([
      '/preview'
    ]);

  }

}