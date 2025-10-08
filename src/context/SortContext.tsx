import { createContext, useContext, useState, ReactNode } from "react";

type SortKey = "name" | "id";
type SortDir = "asc" | "desc";

interface SortContextType {
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  sortDir: SortDir;
  setSortDir: (dir: SortDir) => void;
}

const SortContext = createContext<SortContextType | null>(null);

export function SortProvider({ children }: { children: ReactNode }) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  return (
    <SortContext.Provider value={{ sortKey, setSortKey, sortDir, setSortDir }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const context = useContext(SortContext);
  if (!context) throw new Error("useSort must be used within a SortProvider");
  return context;
}
