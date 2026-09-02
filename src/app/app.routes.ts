import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { CreateInvitationComponent } from './pages/create-invitation/create-invitation.component';
import { InvitationComponent } from './pages/invitation/invitation.component';
import { ReponseComponent } from './pages/reponse/reponse.component';
import { InvitationPreviewComponent } from './pages/invitation-preview/invitation-preview.component';
import { PartageComponent } from './pages/partage/partage.component';
import { GestionReponseComponent } from './pages/gestion-reponse/gestion-reponse.component';

export const routes: Routes = [

     {
        path: "",
        redirectTo:"/home",
        pathMatch: 'full'
    },
    {
        path: "home",
        component: AccueilComponent,
    },
    {
        path: "create-invitation",
        component: CreateInvitationComponent,
    },
    {
        path: "invitation",
        component: InvitationComponent,
    }, 
    {
        path: "preview",
        component: InvitationPreviewComponent,
    },
    {
        path: "reponse/:id",
        component: ReponseComponent,
    },
    {
        path: "partage/:id",
        component: PartageComponent,
    },
    {
        path: "gestion/:id",
        component: GestionReponseComponent,
    }
];
