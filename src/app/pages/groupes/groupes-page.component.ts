import { Component } from '@angular/core';

@Component({
  selector: 'app-groupes-page',
  standalone: true,
  template: `
    <section class="rounded-3xl border border-pitch-500/20 bg-slate-900/80 p-8 shadow-stadium">
      <h1 class="text-3xl font-bold text-white">Classement des groupes</h1>
      <p class="mt-3 text-slate-300">Points, différence de buts et dynamique des équipes.</p>

      <div class="mt-6 overflow-hidden rounded-2xl border border-slate-700">
        <table class="min-w-full divide-y divide-slate-700 text-sm">
          <thead class="bg-slate-800/80 text-slate-300">
            <tr>
              <th class="px-4 py-3 text-left">Équipe</th>
              <th class="px-4 py-3 text-center">Pts</th>
              <th class="px-4 py-3 text-center">J</th>
              <th class="px-4 py-3 text-center">Diff</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 bg-slate-900/60">
            @for (ligne of classement; track ligne.equipe) {
              <tr>
                <td class="px-4 py-3 font-medium text-white">{{ ligne.equipe }}</td>
                <td class="px-4 py-3 text-center text-pitch-200">{{ ligne.points }}</td>
                <td class="px-4 py-3 text-center text-slate-300">{{ ligne.matchs }}</td>
                <td class="px-4 py-3 text-center text-slate-300">{{ ligne.diff }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class GroupesPageComponent {
  classement = [
    { equipe: 'France', points: 6, matchs: 2, diff: '+4' },
    { equipe: 'Mexique', points: 4, matchs: 2, diff: '+1' },
    { equipe: 'Japon', points: 1, matchs: 2, diff: '-2' },
    { equipe: 'Ghana', points: 0, matchs: 2, diff: '-3' }
  ];
}
