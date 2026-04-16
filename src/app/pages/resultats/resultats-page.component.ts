import { Component } from '@angular/core';

@Component({
  selector: 'app-resultats-page',
  standalone: true,
  template: `
    <section class="rounded-3xl border border-pitch-500/20 bg-slate-900/80 p-8 shadow-stadium">
      <h1 class="text-3xl font-bold text-white">Résultats</h1>
      <p class="mt-3 text-slate-300">Scores des dernières rencontres.</p>

      <div class="mt-6 space-y-3">
        @for (resultat of resultats; track resultat.id) {
          <article class="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-white">{{ resultat.equipeA }} <span class="text-floodlight">{{ resultat.score }}</span> {{ resultat.equipeB }}</p>
              <p class="text-sm text-slate-300">{{ resultat.date }}</p>
            </div>
            <p class="mt-2 text-sm text-slate-400">{{ resultat.phase }}</p>
          </article>
        }
      </div>
    </section>
  `
})
export class ResultatsPageComponent {
  resultats = [
    { id: 1, equipeA: 'Espagne', score: '2 - 1', equipeB: 'Maroc', date: '11 juin 2026', phase: 'Phase de groupes' },
    { id: 2, equipeA: 'Brésil', score: '3 - 0', equipeB: 'Canada', date: '11 juin 2026', phase: 'Phase de groupes' },
    { id: 3, equipeA: 'Allemagne', score: '1 - 1', equipeB: 'Pays-Bas', date: '10 juin 2026', phase: 'Phase de groupes' }
  ];
}
