# Smart SQL Assistant - Application Web

Une application web simple et rapide pour formater vos requêtes SQL avec des conseils d'optimisation instantanés.

## Fonctionnalités

- ✅ Formatage SQL automatique avec indentation
- ✅ Conseils d'optimisation contextuels selon le type de requête
- ✅ Exemples rapides cliquables
- ✅ Sauvegarde automatique des requêtes
- ✅ Interface utilisateur intuitive et élégante
- ✅ Fonctionnalités accessibles directement depuis le navigateur

## Installation

Pour utiliser cette application web, suivez ces étapes :

1. Téléchargez tous les fichiers du projet dans un dossier sur votre machine locale.
2. Assurez-vous d'avoir un serveur local ou un hébergement web pour déployer l'application.
3. Déployez les fichiers sur votre serveur ou hébergement web préféré.

## Utilisation

1. Accédez à l'URL où votre application est hébergée.
2. Collez votre requête SQL dans la zone de texte prévue à cet effet.
3. Cliquez sur "Formatter" pour obtenir le code SQL formaté.
4. Consultez les conseils d'optimisation automatiques fournis.
5. Utilisez les exemples rapides pour apprendre et vous inspirer.

## Structure des fichiers

- `index.html` - Page principale de l'application web
- `styles.css` - Styles CSS pour l'application
- `popup.js` - Logique JavaScript pour le formatage SQL et les fonctionnalités
- `icons/` - Icônes utilisées dans l'application
- `README.md` - Documentation du projet

## Développement

Pour modifier l'application :

1. Modifiez les fichiers selon vos besoins.
2. Testez les modifications localement en utilisant un serveur local (par exemple, Live Server dans Visual Studio Code).
3. Déployez les modifications sur votre serveur ou hébergement web.

## Conseils d'optimisation détectés

- SELECT sans LIMIT
- Sous-requêtes multiples
- SELECT * non optimisé
- Recherches LIKE inefficaces
- UPDATE/DELETE sans WHERE
- GROUP BY sans HAVING approprié
