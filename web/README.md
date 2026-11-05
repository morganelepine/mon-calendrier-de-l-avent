# Web

Pages statiques de « Mon calendrier de l'avent » : présentation ([index.html](./index.html)), politique de confidentialité
([privacy.html](./privacy.html)), référencée comme
_privacy policy URL_ dans les fiches App Store / Google Play, et conditions d'utilisation et de vente
([terms.html](./terms.html)), référencées dans la page « Contenu de l'application » de la Play Console.

Aucune dépendance, aucun build : des fichiers HTML qui partagent [styles.css](./styles.css), ainsi que
les polices de `fonts/` et les images de `images/`.

## Aperçu local

Ouvrir directement [index.html](./index.html) dans un navigateur, ou servir le dossier :

```bash
npx serve web
```

## Déploiement

Le dossier peut être publié tel quel sur n'importe quel hébergeur de fichiers statiques (GitHub Pages,
Netlify, Vercel, etc.) : il suffit de pointer l'hébergeur sur `web/` en tant que racine du site.

## Mise à jour du contenu

Penser à mettre à jour la date « dernière mise à jour » en haut de chaque page à chaque
modification substantielle du contenu (nouvelle donnée collectée, nouveau service tiers, etc.).
