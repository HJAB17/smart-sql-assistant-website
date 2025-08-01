# SQL Formatter - Extension Chrome

Une extension Chrome simple et rapide pour formater vos requêtes SQL avec des conseils d'optimisation instantanés.

## Fonctionnalités

- ✅ Formatage SQL automatique avec indentation
- ✅ Conseils d'optimisation contextuels selon le type de requête
- ✅ Exemples rapides cliquables
- ✅ Sauvegarde automatique des requêtes
- ✅ Interface compacte optimisée pour popup
- ✅ Menu contextuel pour formater le texte sélectionné

## Installation

1. Téléchargez tous les fichiers dans un dossier
2. Ouvrez Chrome et allez dans `chrome://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier contenant les fichiers

## Utilisation

1. Cliquez sur l'icône de l'extension dans la barre d'outils
2. Collez votre requête SQL dans la zone de texte
3. Cliquez sur "Formatter" pour obtenir le code formaté
4. Consultez les conseils d'optimisation automatiques
5. Utilisez les exemples rapides pour apprendre

## Structure des fichiers

- `manifest.json` - Configuration de l'extension
- `popup.html` - Interface utilisateur
- `popup.js` - Logique JavaScript
- `styles.css` - Styles CSS
- `background.js` - Script de fond
- `icons/` - Icônes de l'extension
- `README.md` - Documentation

## Développement

Pour modifier l'extension :
1. Modifiez les fichiers selon vos besoins
2. Rechargez l'extension dans `chrome://extensions/`
3. Testez les modifications

## Conseils d'optimisation détectés

- SELECT sans LIMIT
- Sous-requêtes multiples
- SELECT * non optimisé
- Recherches LIKE inefficaces
- UPDATE/DELETE sans WHERE
- GROUP BY sans HAVING approprié
