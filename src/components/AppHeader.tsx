import { motion } from "framer-motion";
import { Database } from "lucide-react";

export function AppHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-8"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20">
        <Database className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Smart SQL Assistant</h1>
        <p className="text-xs text-muted-foreground">Formatez, optimisez, maîtrisez</p>
      </div>
    </motion.header>
  );
}
