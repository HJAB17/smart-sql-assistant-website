import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Zap, Database, Info, Shield } from "lucide-react";
import type { OptimizationTip } from "@/lib/sql-engine";

const tipConfig: Record<string, { color: string; icon: React.ElementType }> = {
  performance: { color: "tip-performance", icon: Zap },
  security: { color: "tip-security", icon: Shield },
  optimization: { color: "tip-optimization", icon: Database },
  "best-practice": { color: "tip-best-practice", icon: Info },
  index: { color: "tip-index", icon: Database },
  error: { color: "tip-error", icon: AlertTriangle },
};

export function OptimizationTipsPanel({ tips }: { tips: OptimizationTip[] }) {
  if (tips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <AlertTriangle className="w-4 h-4 text-tip-optimization" />
        <span className="text-sm font-medium text-foreground">
          Conseils d'optimisation ({tips.length})
        </span>
      </div>
      <div className="divide-y divide-border">
        <AnimatePresence>
          {tips.map((tip, i) => {
            const config = tipConfig[tip.type] || tipConfig["best-practice"];
            const Icon = config.icon;
            return (
              <motion.div
                key={`${tip.title}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 p-4"
              >
                <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-${config.color}/10`}>
                  <Icon className={`w-4 h-4 text-${config.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{tip.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tip.description}</p>
                  <code className="mt-2 block text-xs font-mono text-accent/80 bg-secondary/50 rounded-md px-2.5 py-1.5">
                    {tip.example}
                  </code>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
