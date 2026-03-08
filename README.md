# 🧠 Smart SQL Assistant

**Formatez, optimisez et apprenez le SQL en quelques secondes.**

🔗 **Site en ligne** : [smart-sql-assistant.ovh](https://smart-sql-assistant.ovh)

---

## ✨ Fonctionnalités

- **Formatage SQL intelligent** — Collez votre requête, obtenez un code propre et indenté instantanément
- **Coloration syntaxique** — Visualisez clairement les mots-clés, tables, fonctions et opérateurs
- **Conseils d'optimisation** — Recevez des recommandations contextuelles (index, performances, sécurité, bonnes pratiques)
- **Exemples SQL prêts à l'emploi** — Explorez une bibliothèque d'exemples classés par catégorie (SELECT, JOIN, agrégations…)
- **Sauvegarde automatique** — Vos requêtes sont conservées localement dans le navigateur
- **Copier en un clic** — Copiez le SQL formaté directement dans le presse-papiers
- **100% côté client** — Aucune donnée envoyée à un serveur, tout fonctionne dans votre navigateur

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| [React](https://react.dev) | Interface utilisateur |
| [TypeScript](https://www.typescriptlang.org) | Typage statique |
| [Vite](https://vitejs.dev) | Build & dev server |
| [Tailwind CSS](https://tailwindcss.com) | Styles utilitaires |
| [shadcn/ui](https://ui.shadcn.com) | Composants UI |
| [Framer Motion](https://www.framer.com/motion) | Animations |
| [Lucide Icons](https://lucide.dev) | Icônes |

---

## 🚀 Déploiement

Le site est déployé automatiquement via **GitHub Actions** sur **GitHub Pages**.

À chaque push sur `main`, le workflow :
1. Installe les dépendances
2. Build le projet avec Vite
3. Publie le dossier `dist/` sur la branche `gh-pages`

Le domaine personnalisé `smart-sql-assistant.ovh` est configuré via le fichier `public/CNAME`.

---

## 💻 Développement local

```bash
# Cloner le repo
git clone https://github.com/HJAB17/smart-sql-assistant-website.git
cd smart-sql-assistant-website

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
