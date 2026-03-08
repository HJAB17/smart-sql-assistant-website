// SQL formatting and analysis logic

export interface OptimizationTip {
  type: "performance" | "security" | "optimization" | "best-practice" | "index" | "error";
  title: string;
  description: string;
  example: string;
}

export interface SQLExample {
  key: string;
  title: string;
  description: string;
  preview: string;
  query: string;
  icon: string;
  relatedTip: OptimizationTip;
}

export const sqlExamples: SQLExample[] = [
  {
    key: "users",
    title: "Utilisateurs actifs",
    description: "Sélectionner les utilisateurs connectés récemment",
    preview: "SELECT id, nom, email FROM u...",
    icon: "users",
    query: `SELECT id, nom, email, derniere_connexion\nFROM utilisateurs\nWHERE derniere_connexion > DATE_SUB(NOW(), INTERVAL 30 DAY)\nORDER BY derniere_connexion DESC\nLIMIT 50;`,
    relatedTip: { type: "performance", title: "Ajoutez LIMIT", description: "Limitez les résultats pour optimiser la performance.", example: "SELECT * FROM table LIMIT 100" },
  },
  {
    key: "orders",
    title: "Commandes par utilisateur",
    description: "Compter les commandes groupées par utilisateur",
    preview: "SELECT u.nom, COUNT(c.id)...",
    icon: "shopping-cart",
    query: `SELECT u.nom, u.email, COUNT(c.id) as nombre_commandes, SUM(c.montant) as total_achats\nFROM utilisateurs u\nLEFT JOIN commandes c ON u.id = c.client_id\nGROUP BY u.id, u.nom, u.email\nHAVING COUNT(c.id) > 0\nORDER BY nombre_commandes DESC;`,
    relatedTip: { type: "optimization", title: "Considérez HAVING", description: "Utilisez HAVING pour filtrer les résultats après GROUP BY.", example: "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id HAVING COUNT(*) > 5" },
  },
  {
    key: "update",
    title: "Mise à jour prix",
    description: "Mettre à jour les prix avec une augmentation",
    preview: "UPDATE produits SET prix...",
    icon: "dollar-sign",
    query: `UPDATE produits\nSET prix = prix * 1.10,\n    date_modification = NOW()\nWHERE categorie_id = 1\n  AND prix < 100\n  AND stock > 0;`,
    relatedTip: { type: "best-practice", title: "Mise à jour conditionnelle", description: "Assurez-vous que les mises à jour conditionnelles sont bien ciblées.", example: "UPDATE products SET price = price * 1.10 WHERE category_id = 1 AND price < 100" },
  },
  {
    key: "delete",
    title: "Nettoyage sessions",
    description: "Supprimer les sessions expirées",
    preview: "DELETE FROM sessions WHERE...",
    icon: "trash-2",
    query: `DELETE FROM sessions\nWHERE date_expiration < NOW()\n   OR derniere_activite < DATE_SUB(NOW(), INTERVAL 7 DAY);`,
    relatedTip: { type: "security", title: "Attention : Opération sans WHERE", description: "Assurez-vous que cette opération sur toute la table est intentionnelle.", example: "DELETE FROM table WHERE condition = value" },
  },
  {
    key: "complexJoin",
    title: "Jointure complexe",
    description: "Jointure complexe avec agrégation",
    preview: "SELECT o.id, o.date, c.nom...",
    icon: "git-merge",
    query: `SELECT o.id, o.date, c.nom, c.email, SUM(p.prix * oi.quantite) as total\nFROM commandes o\nJOIN clients c ON o.client_id = c.id\nJOIN order_items oi ON o.id = oi.commande_id\nJOIN produits p ON oi.produit_id = p.id\nWHERE o.date > '2023-01-01'\nGROUP BY o.id, o.date, c.nom, c.email\nORDER BY total DESC;`,
    relatedTip: { type: "performance", title: "Optimisez les jointures", description: "Les jointures multiples peuvent être coûteuses. Assurez-vous qu'elles sont nécessaires.", example: "SELECT * FROM table1 JOIN table2 ON table1.id = table2.id" },
  },
  {
    key: "subquery",
    title: "Sous-requête",
    description: "Requête avec sous-requête",
    preview: "SELECT nom, email FROM...",
    icon: "layers",
    query: `SELECT nom, email\nFROM clients\nWHERE id IN (\n    SELECT client_id\n    FROM commandes\n    WHERE date > '2023-01-01'\n    GROUP BY client_id\n    HAVING SUM(montant) > 1000\n);`,
    relatedTip: { type: "performance", title: "Optimisez les sous-requêtes", description: "Considérez utiliser des JOINs au lieu de sous-requêtes.", example: "SELECT u.*, COUNT(c.id) FROM users u LEFT JOIN commands c ON u.id = c.user_id GROUP BY u.id" },
  },
  {
    key: "aggregation",
    title: "Agrégation",
    description: "Requête avec agrégation",
    preview: "SELECT categorie_id, AVG...",
    icon: "bar-chart-2",
    query: `SELECT categorie_id, AVG(prix) as prix_moyen\nFROM produits\nGROUP BY categorie_id\nHAVING AVG(prix) > 50\nORDER BY prix_moyen DESC;`,
    relatedTip: { type: "optimization", title: "Utilisez des agrégations", description: "Les fonctions d'agrégation peuvent aider à résumer les données.", example: "SELECT category_id, AVG(price) FROM products GROUP BY category_id" },
  },
  {
    key: "conditionalUpdate",
    title: "Mise à jour conditionnelle",
    description: "Mettre à jour conditionnellement",
    preview: "UPDATE stocks SET quantite...",
    icon: "refresh-cw",
    query: `UPDATE stocks\nSET quantite = quantite - 1\nWHERE produit_id IN (\n    SELECT id FROM produits WHERE categorie_id = 1\n)\nAND quantite > 0;`,
    relatedTip: { type: "best-practice", title: "Mise à jour conditionnelle", description: "Les mises à jour conditionnelles doivent être bien ciblées.", example: "UPDATE stocks SET quantity = quantity - 1 WHERE product_id IN (SELECT id FROM products WHERE category_id = 1)" },
  },
];

export function formatSQL(input: string): string {
  if (!input.trim()) return "";
  return input
    .replace(/\s+/g, " ")
    .replace(/SELECT\s+/gi, "SELECT\n    ")
    .replace(/\s+FROM\s+/gi, "\nFROM\n    ")
    .replace(/\s+WHERE\s+/gi, "\nWHERE\n    ")
    .replace(/\s+AND\s+/gi, "\n    AND ")
    .replace(/\s+OR\s+/gi, "\n    OR ")
    .replace(/\s+ORDER\s+BY\s+/gi, "\nORDER BY\n    ")
    .replace(/\s+GROUP\s+BY\s+/gi, "\nGROUP BY\n    ")
    .replace(/\s+HAVING\s+/gi, "\nHAVING\n    ")
    .replace(/\s+LIMIT\s+/gi, "\nLIMIT ")
    .replace(/\s+JOIN\s+/gi, "\nJOIN ")
    .replace(/\s+LEFT\s+JOIN\s+/gi, "\nLEFT JOIN ")
    .replace(/\s+RIGHT\s+JOIN\s+/gi, "\nRIGHT JOIN ")
    .replace(/\s+INNER\s+JOIN\s+/gi, "\nINNER JOIN ")
    .replace(/,\s*/g, ",\n    ")
    .replace(/\(\s*SELECT/gi, "(\n        SELECT")
    .replace(/\)\s*AS/gi, "\n    ) AS")
    .trim();
}

export function analyzeSQL(sql: string): OptimizationTip[] {
  const tips: OptimizationTip[] = [];
  const upper = sql.toUpperCase();

  if (upper.includes("SELECT") && !upper.includes("LIMIT")) {
    tips.push({ type: "performance", title: "Ajoutez LIMIT", description: "Limitez les résultats pour optimiser la performance", example: "SELECT * FROM table LIMIT 100" });
  }
  if ((upper.match(/SELECT/g) || []).length > 1) {
    tips.push({ type: "performance", title: "Optimisez les sous-requêtes", description: "Considérez utiliser des JOINs au lieu de sous-requêtes", example: "SELECT u.*, COUNT(c.id) FROM users u LEFT JOIN commands c ON u.id = c.user_id GROUP BY u.id" });
  }
  if (upper.includes("SELECT *")) {
    tips.push({ type: "best-practice", title: "Évitez SELECT *", description: "Spécifiez les colonnes nécessaires pour réduire le transfert de données", example: "SELECT id, nom, email FROM users" });
  }
  if (upper.includes("WHERE") && upper.includes("LIKE") && !upper.includes("=")) {
    tips.push({ type: "index", title: "Optimisez les recherches LIKE", description: "Évitez les wildcards en début de LIKE, utilisez des index full-text", example: "SELECT * FROM articles WHERE titre LIKE 'mot%'" });
  }
  if ((upper.includes("UPDATE") || upper.includes("DELETE")) && !upper.includes("WHERE")) {
    tips.push({ type: "security", title: "Attention: Opération sans WHERE", description: "Assurez-vous que cette opération sur toute la table est intentionnelle", example: "DELETE FROM table WHERE condition = value" });
  }
  if (upper.includes("GROUP BY") && upper.includes("COUNT") && !upper.includes("HAVING")) {
    tips.push({ type: "optimization", title: "Considérez HAVING", description: "Utilisez HAVING pour filtrer les résultats après GROUP BY", example: "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id HAVING COUNT(*) > 5" });
  }
  if (/WHERE.*\bOR\b/i.test(sql)) {
    tips.push({ type: "performance", title: "Évitez l'utilisation excessive de OR", description: "Utilisez des requêtes UNION ou des index appropriés", example: "SELECT * FROM table WHERE cond1 UNION SELECT * FROM table WHERE cond2" });
  }
  if (upper.includes("JOIN") && !upper.includes("ON")) {
    tips.push({ type: "error", title: "JOIN sans condition", description: "Les jointures doivent avoir une condition ON pour éviter les produits cartésiens", example: "SELECT * FROM t1 JOIN t2 ON t1.id = t2.id" });
  }
  if (upper.includes("SELECT DISTINCT")) {
    tips.push({ type: "optimization", title: "Vérifiez DISTINCT", description: "DISTINCT peut être coûteux en performance. Assurez-vous qu'il est nécessaire.", example: "SELECT id, name FROM table" });
  }
  if (upper.includes("NOT IN")) {
    tips.push({ type: "performance", title: "Évitez NOT IN", description: "NOT IN peut être lent. Utilisez NOT EXISTS ou des jointures externes.", example: "SELECT * FROM t1 WHERE NOT EXISTS (SELECT 1 FROM t2 WHERE t2.id = t1.id)" });
  }

  return tips;
}

// Simple SQL syntax highlighting (returns JSX-compatible spans)
export function highlightSQL(sql: string): string {
  const keywords = /\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|AS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|COUNT|SUM|AVG|MIN|MAX|DISTINCT|IN|NOT|EXISTS|BETWEEN|LIKE|IS|NULL|DESC|ASC|UNION|ALL|CASE|WHEN|THEN|ELSE|END|NOW|DATE_SUB|INTERVAL)\b/gi;
  const strings = /('([^']*)')/g;
  const numbers = /\b(\d+)\b/g;
  const functions = /\b(DATE_SUB|NOW|COUNT|SUM|AVG|MIN|MAX)\s*\(/gi;

  return sql
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(strings, '<span class="text-tip-optimization">$1</span>')
    .replace(functions, '<span class="text-accent">$1(</span>')
    .replace(keywords, '<span class="text-primary font-semibold">$1</span>')
    .replace(numbers, '<span class="text-tip-best-practice">$1</span>');
}
