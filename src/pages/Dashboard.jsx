import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getExpenses } from "../utils/storage";

function Dashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  // Get saved expenses from localStorage
  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  // Show latest 5 expenses
  const recentExpenses = expenses.slice(-5).reverse();

  const summaryCards = [
    {
      title: "Available Balance",
      amount: "₹12,450",
      change: "+8.4%",
      icon: Wallet,
    },
    {
      title: "Total Income",
      amount: "₹24,300",
      change: "+12.5%",
      icon: TrendingUp,
    },
    {
      title: "Total Spent",
      amount: "₹11,850",
      change: "-5.3%",
      icon: TrendingDown,
    },
    {
      title: "Total Saved",
      amount: "₹8,500",
      change: "+18.7%",
      icon: PiggyBank,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}
      <section>
        <p className="text-sm text-slate-500">
          Tuesday, August 18
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Good evening 👋
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here's a quick look at your money this month.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <span className="text-xs font-medium text-emerald-600">
                  {card.change}
                </span>

              </div>

              <p className="mt-5 text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                {card.amount}
              </h2>
            </div>
          );
        })}

      </section>

      {/* Middle Section */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Spending Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Spending overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Where your money went this month
              </p>
            </div>

            <button className="text-sm font-medium text-indigo-600">
              This month
            </button>

          </div>

          {/* Simple Chart */}
          <div className="mt-8 flex h-56 items-end gap-3 sm:gap-5">

            {[45, 65, 38, 72, 55, 82, 60].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >

                  <div
                    className="w-full max-w-10 rounded-t-lg bg-indigo-100"
                    style={{ height: `${height}%` }}
                  />

                  <span className="text-xs text-slate-400">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

        {/* Quick Add */}
        <div className="rounded-2xl bg-indigo-600 p-6 text-white">

          <p className="text-sm text-indigo-100">
            Quick action
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Track your spending
          </h2>

          <p className="mt-2 text-sm leading-6 text-indigo-100">
            Add an expense and keep your money story up to date.
          </p>

          <button
            onClick={() => navigate("/add-expense")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            <Plus size={18} />
            Add Expense
          </button>

        </div>

      </section>

      {/* Recent Activity */}
      <section className="rounded-2xl border border-slate-200 bg-white">

        <div className="flex items-center justify-between border-b border-slate-100 p-6">

          <div>
            <h2 className="font-semibold text-slate-900">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest transactions
            </p>
          </div>

          <button
            onClick={() => navigate("/money-map")}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600"
          >
            View all
            <ArrowUpRight size={16} />
          </button>

        </div>

        {/* No Expenses */}
        {recentExpenses.length === 0 && (
          <div className="px-6 py-12 text-center">

            <p className="text-sm font-medium text-slate-600">
              No expenses yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add your first expense to see it here.
            </p>

            <button
              onClick={() => navigate("/add-expense")}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add Expense
            </button>

          </div>
        )}

        {/* User Expenses */}
        {recentExpenses.length > 0 && (
          <div className="divide-y divide-slate-100">

            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                    {expense.category === "Food" && "🍔"}
                    {expense.category === "Travel" && "🚌"}
                    {expense.category === "Shopping" && "🛍️"}
                    {expense.category === "Education" && "📚"}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {expense.description}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {expense.category} · {expense.payment}
                    </p>
                  </div>

                </div>

                <p className="text-sm font-semibold text-slate-900">
                  - ₹{expense.amount}
                </p>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Dashboard;