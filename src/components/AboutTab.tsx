import { motion } from "framer-motion";
import { Info, Mail, Code, Zap, Shield } from "lucide-react";

export function AboutTab() {
  const features = [
    { icon: Code, title: "Formatage intelligent", desc: "Indentation automatique et coloration syntaxique" },
    { icon: Zap, title: "Optimisation contextuelle", desc: "Conseils basés sur le type de requête" },
    { icon: Shield, title: "Détection de risques", desc: "Alertes pour les opérations dangereuses" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
          <Info className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">À propos</span>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Smart SQL Assistant</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre outil en ligne pour formater et optimiser les requêtes SQL.
              Notre objectif est de vous aider à écrire des requêtes propres et optimisées en quelques secondes.
            </p>
          </div>

          <div className="grid gap-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <a href="mailto:admin@smart-sql-assistant.ovh" className="hover:text-primary transition-colors">
              admin@smart-sql-assistant.ovh
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
