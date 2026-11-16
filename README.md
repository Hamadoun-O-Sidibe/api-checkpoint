# Le carnet

Application React et Vite qui affiche les utilisateurs de JSONPlaceholder. Le style utilise Tailwind CSS.

## Lancer en local

```sh
npm ci
npm run dev
```

## Déployer sur GitHub Pages

Le dépôt est configuré pour l’URL de projet `https://hamadoun-o-sidibe.github.io/api-checkpoint/`.

1. Poussez le projet sur la branche `main` de GitHub.
2. Dans le dépôt, ouvrez **Settings → Pages**.
3. Choisissez **GitHub Actions** comme source de déploiement.
4. À chaque push sur `main`, le workflow `.github/workflows/deploy.yml` construit le site et le publie. Vous pouvez aussi le lancer depuis l’onglet **Actions** avec **Run workflow**.

Pour vérifier le build localement :

```sh
npm run build
npm run preview
```
