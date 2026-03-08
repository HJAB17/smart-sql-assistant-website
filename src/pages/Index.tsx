import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, BookOpen, Info } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { SQLFormatterTab } from "@/components/SQLFormatterTab";
import { SQLExamplesTab } from "@/components/SQLExamplesTab";
import { AboutTab } from "@/components/AboutTab";
import type { SQLExample } from "@/lib/sql-engine";

const tabs = [
  { id: "formatter", label: "Formatter", icon: Code },
  { id: "examples", label: "Exemples", icon: BookOpen },
  { id: "about", label: "À propos", icon: Info },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("formatter");
  const formatterInputRef = useRef<((sql: string) => void) | null>(null);

  const handleSelectExample = (example: SQLExample) => {
    // Set input in localStorage so formatter picks it up
    localStorage.setItem(
      "sqlFormatterData",
      JSON.stringify({ inputSQL: example.query, formattedSQL: "" })
    );
    setActiveTab("formatter");
    // Force remount of formatter to pick up new data
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        <AppHeader />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            Formatez votre SQL en{" "}
            <span className="text-gradient">quelques secondes</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Collez votre requête SQL, obtenez un code propre et des conseils d'optimisation instantanés.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary/40 rounded-xl p-1 border border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "formatter" && <SQLFormatterTab key={Date.now()} />}
            {activeTab === "examples" && <SQLExamplesTab onSelectExample={handleSelectExample} />}
            {activeTab === "about" && <AboutTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
