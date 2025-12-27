import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

/* =========================
   TYPES
========================= */

type Category =
  | "Stocks"
  | "SIP"
  | "Mutual Fund"
  | "Gold"
  | "Silver"
  | "Physical Asset"
  | "Other";

interface InvestmentEntry {
  id: string;
  category: Category;
  name: string;
  investmentType: "Financial" | "Physical";
  date: string;
  amount: number;
}

/* =========================
   COLORS
========================= */

const COLORS: Record<Category, string> = {
  Stocks: "#2563eb",
  SIP: "#22c55e",
  "Mutual Fund": "#a855f7",
  Gold: "#f59e0b",
  Silver: "#94a3b8",
  "Physical Asset": "#0ea5e9",
  Other: "#64748b",
};

/* =========================
   COMPONENT
========================= */

const BusinessInvestmentsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [investments, setInvestments] = useState<InvestmentEntry[]>([
    {
      id: "1",
      category: "Stocks",
      name: "HDFC Bank",
      investmentType: "Financial",
      date: "2025-12-05",
      amount: 6000,
    },
    {
      id: "2",
      category: "SIP",
      name: "Nifty 50 SIP",
      investmentType: "Financial",
      date: "2025-12-01",
      amount: 4000,
    },
    {
      id: "3",
      category: "Physical Asset",
      name: "Camera",
      investmentType: "Physical",
      date: "2025-12-10",
      amount: 3000,
    },
    {
      id: "4",
      category: "Gold",
      name: "Gold Coin",
      investmentType: "Financial",
      date: "2025-12-12",
      amount: 2000,
    },
  ]);

  const [form, setForm] = useState({
    category: "Stocks" as Category,
    name: "",
    investmentType: "Financial" as "Financial" | "Physical",
    date: "",
    amount: "",
  });

  /* =========================
     DERIVED DATA
  ========================= */

  const totalInvested = useMemo(
    () => investments.reduce((s, i) => s + i.amount, 0),
    [investments]
  );

  const pieData = useMemo(() => {
    const map = new Map<Category, number>();
    investments.forEach((i) => {
      map.set(i.category, (map.get(i.category) || 0) + i.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [investments]);

  /* =========================
     HANDLERS
  ========================= */

  const saveInvestment = () => {
    if (!form.name || !form.amount || !form.date) return;

    setInvestments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        category: form.category,
        name: form.name,
        investmentType: form.investmentType,
        date: form.date,
        amount: Number(form.amount),
      },
    ]);

    setForm({
      category: "Stocks",
      name: "",
      investmentType: "Financial",
      date: "",
      amount: "",
    });

    setOpen(false);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="px-4 pt-6 pb-24 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Investments</h1>
        <p className="text-sm text-muted-foreground">
          Track your physical and financial investments
        </p>
      </div>

      {/* ACTION */}
      <Button className="gap-2 w-full sm:w-auto" onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4" />
        Add Investment
      </Button>

      {/* SUMMARY */}
      <div className="rounded-xl border bg-card p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">
          Total Invested (This Month)
        </p>
        <p className="text-3xl font-bold mt-1">
          ₹{totalInvested.toLocaleString()}
        </p>
      </div>

      {/* PIE CHART */}
      <div className="rounded-xl border bg-card p-4 sm:p-6 space-y-6">
        <h2 className="font-semibold text-lg">
          Monthly Investment Distribution
        </h2>

        <div className="w-full h-[280px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                animationDuration={800}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name as Category]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Investment History</h2>

        {investments.map((i) => (
          <div
            key={i.id}
            className="flex justify-between items-center rounded-lg border p-4 bg-card"
          >
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-xs text-muted-foreground">
                {i.category} • {new Date(i.date).toLocaleDateString()}
              </p>
            </div>
            <p className="font-semibold">
              ₹{i.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-background w-full max-w-lg rounded-2xl p-6 shadow-xl animate-in zoom-in-95 fade-in duration-300">

            <h3 className="text-lg font-semibold mb-4">Add Investment</h3>

            <div className="space-y-4">

              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as Category,
                    investmentType:
                      e.target.value === "Physical Asset"
                        ? "Physical"
                        : "Financial",
                  })
                }
              >
                {Object.keys(COLORS).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <input
                className="w-full rounded-lg border px-3 py-2"
                placeholder="Asset / Investment Name (Camera, HDFC Bank)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="date"
                className="w-full rounded-lg border px-3 py-2"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                placeholder="Amount Invested (₹)"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={saveInvestment}>
                Save Investment
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInvestmentsPage;
