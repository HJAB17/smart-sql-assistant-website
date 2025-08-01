class SQLFormatter {
  constructor() {
    this.inputSQL = "";
    this.formattedSQL = "";
    this.optimizationTips = [];
    this.sqlExamples = {
      users: `SELECT id, nom, email, derniere_connexion
FROM utilisateurs
WHERE derniere_connexion > DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY derniere_connexion DESC
LIMIT 50;`,
      orders: `SELECT u.nom, u.email, COUNT(c.id) as nombre_commandes, SUM(c.montant) as total_achats
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.client_id
GROUP BY u.id, u.nom, u.email
HAVING COUNT(c.id) > 0
ORDER BY nombre_commandes DESC;`,
      update: `UPDATE produits
SET prix = prix * 1.10,
    date_modification = NOW()
WHERE categorie_id = 1
  AND prix < 100
  AND stock > 0;`,
      delete: `DELETE FROM sessions
WHERE date_expiration < NOW()
   OR derniere_activite < DATE_SUB(NOW(), INTERVAL 7 DAY);`,
      complexJoin: `SELECT o.id, o.date, c.nom, c.email, SUM(p.prix * oi.quantite) as total
FROM commandes o
JOIN clients c ON o.client_id = c.id
JOIN order_items oi ON o.id = oi.commande_id
JOIN produits p ON oi.produit_id = p.id
WHERE o.date > '2023-01-01'
GROUP BY o.id, o.date, c.nom, c.email
ORDER BY total DESC;`,
      subquery: `SELECT nom, email
FROM clients
WHERE id IN (
    SELECT client_id
    FROM commandes
    WHERE date > '2023-01-01'
    GROUP BY client_id
    HAVING SUM(montant) > 1000
);`,
      aggregation: `SELECT categorie_id, AVG(prix) as prix_moyen
FROM produits
GROUP BY categorie_id
HAVING AVG(prix) > 50
ORDER BY prix_moyen DESC;`,
      conditionalUpdate: `UPDATE stocks
SET quantite = quantite - 1
WHERE produit_id IN (
    SELECT id FROM produits WHERE categorie_id = 1
)
AND quantite > 0;`,
    };
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadFromStorage();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Input events
    const inputSQL = document.getElementById("input-sql");
    inputSQL.addEventListener("input", (e) => {
      this.inputSQL = e.target.value;
      this.updateCharCount();
      this.saveToStorage();
    });

    // Button events
    document.getElementById("clear-btn").addEventListener("click", () => {
      this.clearInput();
    });

    document.getElementById("format-btn").addEventListener("click", () => {
      this.formatSQL();
    });

    document.getElementById("copy-btn").addEventListener("click", () => {
      this.copyFormatted();
    });

    // Example cards
    document.querySelectorAll(".example-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const example = e.currentTarget.dataset.example;
        this.loadExample(example);
      });
    });
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

    // Update tab content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(`${tabName}-tab`).classList.add("active");
  }

  updateCharCount() {
    document.getElementById("char-count").textContent = `${this.inputSQL.length} caractères`;
  }

  clearInput() {
    this.inputSQL = "";
    this.formattedSQL = "";
    this.optimizationTips = [];
    document.getElementById("input-sql").value = "";
    document.getElementById("output-sql").textContent = "";
    document.getElementById("optimization-tips").style.display = "none";
    this.updateCharCount();
    this.saveToStorage();
  }

  formatSQL() {
    if (!this.inputSQL.trim()) return;

    // Format SQL
    this.formattedSQL = this.inputSQL
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

    // Use Prism.js to highlight the formatted SQL
    document.getElementById("output-sql").textContent = this.formattedSQL;
    Prism.highlightElement(document.getElementById("output-sql"));

    // Analyze and show tips
    this.optimizationTips = this.analyzeSQL(this.inputSQL);
    this.displayOptimizationTips();
    this.saveToStorage();
  }

  analyzeSQL(sql) {
    const tips = [];
    const upperSQL = sql.toUpperCase();

    // SELECT without LIMIT
    if (upperSQL.includes("SELECT") && !upperSQL.includes("LIMIT")) {
      tips.push({
        type: "performance",
        title: "Ajoutez LIMIT",
        description: "Limitez les résultats pour optimiser la performance",
        example: "SELECT * FROM table LIMIT 100",
        icon: "zap",
      });
    }

    // Multiple subqueries
    if ((upperSQL.match(/SELECT/g) || []).length > 1) {
      tips.push({
        type: "performance",
        title: "Optimisez les sous-requêtes",
        description: "Considérez utiliser des JOINs au lieu de sous-requêtes pour de meilleures performances",
        example: "SELECT u.*, COUNT(c.id) FROM users u LEFT JOIN commands c ON u.id = c.user_id GROUP BY u.id",
        icon: "database",
      });
    }

    // SELECT *
    if (upperSQL.includes("SELECT *")) {
      tips.push({
        type: "best-practice",
        title: "Évitez SELECT *",
        description: "Spécifiez les colonnes nécessaires pour réduire le transfert de données",
        example: "SELECT id, nom, email FROM users",
        icon: "alert-triangle",
      });
    }

    // LIKE with leading wildcard
    if (upperSQL.includes("WHERE") && upperSQL.includes("LIKE") && !upperSQL.includes("=")) {
      tips.push({
        type: "index",
        title: "Optimisez les recherches LIKE",
        description: "Évitez les wildcards en début de LIKE, utilisez des index full-text si nécessaire",
        example: "SELECT * FROM articles WHERE titre LIKE 'mot%'",
        icon: "info",
      });
    }

    // UPDATE/DELETE without WHERE
    if ((upperSQL.includes("UPDATE") || upperSQL.includes("DELETE")) && !upperSQL.includes("WHERE")) {
      tips.push({
        type: "security",
        title: "Attention: Opération sans WHERE",
        description: "Assurez-vous que cette opération sur toute la table est intentionnelle",
        example: "DELETE FROM table WHERE condition = value",
        icon: "alert-triangle",
      });
    }

    // GROUP BY without HAVING
    if (upperSQL.includes("GROUP BY") && upperSQL.includes("COUNT") && !upperSQL.includes("HAVING")) {
      tips.push({
        type: "optimization",
        title: "Considérez HAVING pour filtrer les groupes",
        description: "Utilisez HAVING pour filtrer les résultats après GROUP BY",
        example: "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id HAVING COUNT(*) > 5",
        icon: "database",
      });
    }

    // Utilisation de OR dans les clauses WHERE
    if (upperSQL.includes("WHERE") && upperSQL.includes("OR")) {
      tips.push({
        type: "performance",
        title: "Évitez l'utilisation excessive de OR",
        description: "L'utilisation de OR peut rendre les requêtes moins performantes. Utilisez des requêtes union ou des index appropriés.",
        example: "SELECT * FROM table WHERE condition1 = value1 UNION SELECT * FROM table WHERE condition2 = value2",
        icon: "zap",
      });
    }

    // Utilisation de JOIN sans condition
    if (upperSQL.includes("JOIN") && !upperSQL.includes("ON")) {
      tips.push({
        type: "error",
        title: "JOIN sans condition",
        description: "Les jointures doivent avoir une condition ON pour éviter les produits cartésiens.",
        example: "SELECT * FROM table1 JOIN table2 ON table1.id = table2.id",
        icon: "alert-triangle",
      });
    }

    // Utilisation de DISTINCT
    if (upperSQL.includes("SELECT DISTINCT")) {
      tips.push({
        type: "optimization",
        title: "Vérifiez l'utilisation de DISTINCT",
        description: "DISTINCT peut être coûteux en performance. Assurez-vous qu'il est nécessaire.",
        example: "SELECT id, name FROM table",
        icon: "database",
      });
    }

    // Utilisation de NOT IN
    if (upperSQL.includes("NOT IN")) {
      tips.push({
        type: "performance",
        title: "Évitez NOT IN avec des sous-requêtes",
        description: "NOT IN peut être lent avec des sous-requêtes. Utilisez NOT EXISTS ou des jointures externes.",
        example: "SELECT * FROM table1 WHERE NOT EXISTS (SELECT 1 FROM table2 WHERE table2.id = table1.id)",
        icon: "zap",
      });
    }

    // Utilisation de BETWEEN pour les dates
    if (upperSQL.includes("BETWEEN") && upperSQL.includes("AND") && !upperSQL.includes("DATE")) {
      tips.push({
        type: "best-practice",
        title: "Utilisez BETWEEN avec des dates",
        description: "Assurez-vous que BETWEEN est utilisé correctement pour les plages de dates.",
        example: "SELECT * FROM table WHERE date_column BETWEEN '2023-01-01' AND '2023-12-31'",
        icon: "info",
      });
    }

    return tips;
  }

  displayOptimizationTips() {
    const tipsSection = document.getElementById("optimization-tips");
    const tipsContent = document.getElementById("tips-content");
    const tipsCount = document.getElementById("tips-count");

    if (this.optimizationTips.length === 0) {
      tipsSection.style.display = "none";
      return;
    }

    tipsCount.textContent = this.optimizationTips.length;
    tipsContent.innerHTML = "";

    this.optimizationTips.forEach((tip) => {
      const tipElement = document.createElement("div");
      tipElement.className = "tip-item";
      tipElement.innerHTML = `
        <div class="tip-indicator"></div>
        <div class="tip-content">
          <div class="tip-header">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${this.getIconSVG(tip.icon)}
            </svg>
            <span class="tip-title">${tip.title}</span>
          </div>
          <p class="tip-description">${tip.description}</p>
          <code class="tip-example">${tip.example}</code>
        </div>
      `;
      tipsContent.appendChild(tipElement);
    });

    tipsSection.style.display = "block";
  }

  getIconSVG(iconName) {
    const icons = {
      zap: '<polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>',
      database:
        '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
      "alert-triangle":
        '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
      info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    };
    return icons[iconName] || icons["info"];
  }

  copyFormatted() {
    if (!this.formattedSQL) return;
    navigator.clipboard.writeText(this.formattedSQL).then(() => {
      // Show feedback
      const copyBtn = document.getElementById("copy-btn");
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML =
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>Copié!';
      copyBtn.style.backgroundColor = "#059669";
      copyBtn.style.color = "white";
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.backgroundColor = "";
        copyBtn.style.color = "";
      }, 2000);
    });
  }

  loadExample(exampleKey) {
    if (this.sqlExamples[exampleKey]) {
      this.inputSQL = this.sqlExamples[exampleKey];
      document.getElementById("input-sql").value = this.inputSQL;
      this.updateCharCount();
      this.saveToStorage();
      // Switch to formatter tab
      this.switchTab("formatter");
    }
  }

  saveToStorage() {
    // Use localStorage instead of chrome.storage.local
    localStorage.setItem("sqlFormatterData", JSON.stringify({
      inputSQL: this.inputSQL,
      formattedSQL: this.formattedSQL,
    }));
  }

  loadFromStorage() {
    // Use localStorage instead of chrome.storage.local
    const data = localStorage.getItem("sqlFormatterData");
    if (data) {
      const result = JSON.parse(data);
      if (result.inputSQL) {
        this.inputSQL = result.inputSQL;
        document.getElementById("input-sql").value = this.inputSQL;
        this.updateCharCount();
      }
      if (result.formattedSQL) {
        this.formattedSQL = result.formattedSQL;
        document.getElementById("output-sql").textContent = this.formattedSQL;
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SQLFormatter();
});
