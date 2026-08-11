# Web

Page statique de la politique de confidentialité de « Mon calendrier de l'avent », destinée à être
référencée comme *privacy policy URL* dans les fiches App Store / Google Play.

Aucune dépendance, aucun build : un seul fichier HTML autonome.

## Aperçu local

Ouvrir directement [index.html](./index.html) dans un navigateur, ou servir le dossier :

```bash
npx serve web
```

## Déploiement

Le dossier peut être publié tel quel sur n'importe quel hébergeur de fichiers statiques (GitHub Pages,
Netlify, Vercel, etc.) : il suffit de pointer l'hébergeur sur `web/` en tant que racine du site.

## Mise à jour du contenu

Pense à mettre à jour la date « dernière mise à jour » en haut de [index.html](./index.html) à chaque
modification substantielle du contenu (nouvelle donnée collectée, nouveau service tiers, etc.).
