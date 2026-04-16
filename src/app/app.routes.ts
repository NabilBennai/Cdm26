import { Routes } from '@angular/router';
import { AccueilPageComponent } from './pages/accueil/accueil-page.component';
import { CalendrierPageComponent } from './pages/calendrier/calendrier-page.component';
import { GroupesPageComponent } from './pages/groupes/groupes-page.component';
import { ResultatsPageComponent } from './pages/resultats/resultats-page.component';

export const routes: Routes = [
  { path: '', component: AccueilPageComponent },
  { path: 'resultats', component: ResultatsPageComponent },
  { path: 'calendrier', component: CalendrierPageComponent },
  { path: 'groupes', component: GroupesPageComponent },
  { path: '**', redirectTo: '' }
];
