import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export function AppHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-8"
    >
      <img src={logo} alt="Smart SQL Assistant" className="w-11 h-11 rounded-xl" />
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Smart SQL Assistant</h1>
        <p className="text-xs text-muted-foreground">Formatez, optimisez, maîtrisez</p>
      </div>
    </motion.header>
  );
}
