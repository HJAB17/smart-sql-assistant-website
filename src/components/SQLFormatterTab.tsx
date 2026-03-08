import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Trash2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatSQL, analyzeSQL, highlightSQL, type OptimizationTip } from "@/lib/sql-engine";
import { OptimizationTipsPanel } from "@/components/OptimizationTips";

export function SQLFormatterTab() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [tips, setTips] = useState<OptimizationTip[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sqlFormatterData");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.inputSQL) setInput(data.inputSQL);
      if (data.formattedSQL) setFormatted(data.formattedSQL);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sqlFormatterData", JSON.stringify({ inputSQL: input, formattedSQL: formatted }));
  }, [input, formatted]);

  const handleFormat = () => {
    if (!input.trim()) return;
    const result = formatSQL(input);
    setFormatted(result);
    setTips(analyzeSQL(input));
  };

  const handleClear = () => {
    setInput("");
    setFormatted("");
    setTips([]);
  };

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Votre requête SQL</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Collez votre requête SQL ici..."
          className="w-full min-h-[160px] p-4 bg-transparent text-foreground font-mono text-sm resize-y focus:outline-none placeholder:text-muted-foreground/50"
        />
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
          <span className="text-xs text-muted-foreground font-mono">{input.length} caractères</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleClear} className="gap-1.5 text-xs">
              <Trash2 className="w-3.5 h-3.5" /> Effacer
            </Button>
            <Button size="sm" onClick={handleFormat} className="gap-1.5 text-xs animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5" /> Formatter
            </Button>
          </div>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {formatted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">SQL formaté</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code
                className="font-mono text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightSQL(formatted) }}
              />
            </pre>
            <div className="flex justify-end px-4 py-3 border-t border-border bg-secondary/20">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copié !" : "Copier"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <OptimizationTipsPanel tips={tips} />
    </div>
  );
}
