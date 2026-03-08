import { motion } from "framer-motion";
import { Users, ShoppingCart, DollarSign, Trash2, GitMerge, Layers, BarChart2, RefreshCw } from "lucide-react";
import { sqlExamples, type SQLExample } from "@/lib/sql-engine";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  "shopping-cart": ShoppingCart,
  "dollar-sign": DollarSign,
  "trash-2": Trash2,
  "git-merge": GitMerge,
  layers: Layers,
  "bar-chart-2": BarChart2,
  "refresh-cw": RefreshCw,
};

interface Props {
  onSelectExample: (example: SQLExample) => void;
}

export function SQLExamplesTab({ onSelectExample }: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Exemples rapides</span>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sqlExamples.map((ex, i) => {
            const Icon = iconMap[ex.icon] || Layers;
            return (
              <motion.button
                key={ex.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onSelectExample(ex)}
                className="group text-left p-3.5 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{ex.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{ex.description}</p>
                <code className="text-xs font-mono text-accent/70 block truncate">{ex.preview}</code>
              </motion.button>
            );
          })}
        </div>
        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Cliquez sur un exemple pour l'utiliser comme base de votre requête
          </p>
        </div>
      </div>
    </div>
  );
}
