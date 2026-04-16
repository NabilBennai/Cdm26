# cdm26-app

Projet Angular configuré avec Tailwind CSS, maintenant aplati à la racine du dépôt pour faciliter le déploiement Vercel.

## Démarrage local

```bash
npm install
npm start
```

Puis ouvre `http://localhost:4200/`.

## Déploiement automatique sur Vercel

1. Connecte ce dépôt Git à Vercel.
2. Laisse Vercel utiliser la racine du dépôt comme **Root Directory**.
3. Les builds utilisent `npm run build` et publient `dist/cdm26-app/browser` via `vercel.json`.

Chaque push sur la branche connectée déclenchera automatiquement un nouveau déploiement.
