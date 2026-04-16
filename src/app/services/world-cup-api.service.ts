import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface WorldCupEdition {
  year: string;
  label: string;
  dataUrl: string;
}

export interface WorldCupMatch {
  id: string;
  date: string;
  phase: string;
  team1: string;
  team2: string;
  score: string;
  stadium: string;
  city: string;
}

interface RawWorldCupData {
  matches?: RawWorldCupMatch[];
}

interface RawWorldCupMatch {
  date?: string;
  team1?: { name?: string };
  team2?: { name?: string };
  score1?: number;
  score2?: number;
  score1et?: number;
  score2et?: number;
  score1p?: number;
  score2p?: number;
  group?: string;
  round?: string;
  stadium?: { name?: string; city?: string };
  city?: string;
}

@Injectable({ providedIn: 'root' })
export class WorldCupApiService {
  private readonly editions: WorldCupEdition[] = [
    { year: '2022', label: 'Coupe du monde 2022 (Qatar)', dataUrl: 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2022/worldcup.json' },
    { year: '2018', label: 'Coupe du monde 2018 (Russie)', dataUrl: 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2018/worldcup.json' },
    { year: '2014', label: 'Coupe du monde 2014 (Brésil)', dataUrl: 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2014/worldcup.json' }
  ];

  constructor(private readonly http: HttpClient) {}

  getEditions(): WorldCupEdition[] {
    return this.editions;
  }

  getResultsByEdition(year: string): Observable<WorldCupMatch[]> {
    const selectedEdition = this.editions.find((edition) => edition.year === year) ?? this.editions[0];

    return this.http.get<RawWorldCupData>(selectedEdition.dataUrl).pipe(
      map((payload) =>
        (payload.matches ?? []).map((match, index) => ({
          id: `${selectedEdition.year}-${index + 1}`,
          date: this.formatDate(match.date),
          phase: this.resolvePhase(match),
          team1: match.team1?.name ?? 'Équipe 1',
          team2: match.team2?.name ?? 'Équipe 2',
          score: this.formatScore(match),
          stadium: match.stadium?.name ?? 'Stade inconnu',
          city: match.stadium?.city ?? match.city ?? 'Ville inconnue'
        }))
      )
    );
  }

  private resolvePhase(match: RawWorldCupMatch): string {
    return match.round ?? match.group ?? 'Phase non précisée';
  }

  private formatDate(rawDate?: string): string {
    if (!rawDate) return 'Date inconnue';

    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) return rawDate;

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  private formatScore(match: RawWorldCupMatch): string {
    const regularTime = [match.score1, match.score2].every((score) => typeof score === 'number')
      ? `${match.score1} - ${match.score2}`
      : '—';

    const extraTime = [match.score1et, match.score2et].every((score) => typeof score === 'number')
      ? `a.p. ${match.score1et}-${match.score2et}`
      : '';

    const penalties = [match.score1p, match.score2p].every((score) => typeof score === 'number')
      ? `tab ${match.score1p}-${match.score2p}`
      : '';

    return [regularTime, extraTime, penalties].filter(Boolean).join(' · ');
  }
}
