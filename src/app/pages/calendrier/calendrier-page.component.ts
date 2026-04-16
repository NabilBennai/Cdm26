import { Component } from '@angular/core';

@Component({
  selector: 'app-calendrier-page',
  standalone: true,
  template: `
    <section class="rounded-3xl border border-pitch-500/20 bg-slate-900/80 p-8 shadow-stadium">
      <h1 class="text-3xl font-bold text-white">Calendrier des matchs</h1>
      <p class="mt-3 text-slate-300">Les prochaines affiches de la Coupe du monde 2026.</p>

      <div class="mt-6 space-y-3">
        @for (match of matchs; track match.id) {
          <article class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <p class="font-semibold text-white">{{ match.affiche }}</p>
            <p class="text-sm text-slate-300">{{ match.date }}</p>
            <p class="rounded-full bg-pitch-500/20 px-3 py-1 text-xs font-semibold text-pitch-200">{{ match.stade }}</p>
          </article>
        }
      </div>
    </section>
  `
})
export class CalendrierPageComponent {
  matchs = [
    { id: 1, affiche: 'Mexique vs Japon', date: '12 juin 2026 • 18:00', stade: 'Stade Azteca' },
    { id: 2, affiche: 'France vs États-Unis', date: '12 juin 2026 • 21:00', stade: 'MetLife Stadium' },
    { id: 3, affiche: 'Argentine vs Sénégal', date: '13 juin 2026 • 20:00', stade: 'BMO Field' }
  ];
}
