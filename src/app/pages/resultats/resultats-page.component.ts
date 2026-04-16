import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { WorldCupApiService, WorldCupEdition, WorldCupMatch } from '../../services/world-cup-api.service';

@Component({
  selector: 'app-resultats-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="rounded-3xl border border-pitch-500/20 bg-slate-900/80 p-8 shadow-stadium">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white">Résultats</h1>
          <p class="mt-3 text-slate-300">Sélectionne une édition de Coupe du monde et affiche les matchs.</p>
        </div>

        <label class="flex flex-col gap-2 text-sm text-slate-300">
          <span class="font-semibold">Coupe du monde</span>
          <select
            class="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            [(ngModel)]="selectedEdition"
            (ngModelChange)="loadResults($event)"
          >
            @for (edition of editions; track edition.year) {
              <option [value]="edition.year">{{ edition.label }}</option>
            }
          </select>
        </label>
      </div>

      @if (isLoading) {
        <p class="mt-6 text-sm text-slate-300">Chargement des résultats...</p>
      }

      @if (errorMessage) {
        <p class="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{{ errorMessage }}</p>
      }

      @if (!isLoading && !errorMessage) {
        <div class="mt-6 space-y-3">
          @for (resultat of resultats; track resultat.id) {
            <article class="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="font-semibold text-white">{{ resultat.team1 }} <span class="text-floodlight">{{ resultat.score }}</span> {{ resultat.team2 }}</p>
                <p class="text-sm text-slate-300">{{ resultat.date }}</p>
              </div>
              <p class="mt-2 text-sm text-slate-400">{{ resultat.phase }} · {{ resultat.stadium }} ({{ resultat.city }})</p>
            </article>
          }

          @if (!resultats.length) {
            <p class="text-sm text-slate-400">Aucun match disponible pour cette édition.</p>
          }
        </div>
      }
    </section>
  `
})
export class ResultatsPageComponent implements OnInit {
  editions: WorldCupEdition[] = [];
  selectedEdition = '';
  resultats: WorldCupMatch[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private readonly worldCupApi: WorldCupApiService) {}

  ngOnInit(): void {
    this.editions = this.worldCupApi.getEditions();
    this.selectedEdition = this.editions[0]?.year ?? '';

    if (this.selectedEdition) {
      this.loadResults(this.selectedEdition);
    }
  }

  loadResults(year: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.worldCupApi
      .getResultsByEdition(year)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (resultats) => {
          this.resultats = resultats;
        },
        error: () => {
          this.resultats = [];
          this.errorMessage = "Impossible de charger les données OpenFootball pour l'instant.";
        }
      });
  }
}
