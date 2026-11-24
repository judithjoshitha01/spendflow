import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Utensils,
  Bus,
  ShoppingBag,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Food",
    amount: 3800,
    icon: Utensils,
    color: "bg-orange-50 text-orange-600",
    items: [
      { name: "Lunch", amount: 2100 },
      { name: "Snacks", amount: 1200 },
      { name: "Coffee", amount: 500 },
    ],
  },
  {
    name: "Travel",
    amount: 1200,
    icon: Bus,
    color: "bg-blue-50 text-blue-600",
    items: [
      { name: "Bus", amount: 700 },
      { name: "Auto", amount: 300 },
      { name: "Other", amount: 200 },
    ],
  },
  {
    name: "Shopping",
    amount: 2500,
    icon: ShoppingBag,
    color: "bg-purple-50 text-purple-600",
    items: [
      { name: "Clothes", amount: 1500 },
      { name: "Accessories", amount: 600 },
      { name: "Other", amount: 400 },
    ],
  },
  {
    name: "Education",
    amount: 800,
    icon: BookOpen,
    color: "bg-green-50 text-green-600",
    items: [
      { name: "Books", amount: 500 },
      { name: "Stationery", amount: 300 },
    ],
  },
];

function MoneyMap() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const totalSpent = categories.reduce(
    (total, category) => total + category.amount,
    0
  );

  return (
    <div className="mx-auto max-w-5xl">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-indigo-600">
          Follow your spending
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Money Map
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          See where your money goes and explore each spending category.
        </p>
      </div>

      {/* Total */}
      <div className="mb-6 rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
        <p className="text-sm text-slate-400">
          Total spending
        </p>

        <h2 className="mt-2 text-3xl font-semibold">
          ₹{totalSpent.toLocaleString()}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          This month
        </p>
      </div>

      {/* Map */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {categories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expanded === category.name;

          const percentage = Math.round(
            (category.amount / totalSpent) * 100
          );

          return (
            <div
              key={category.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
            >

              {/* Category */}
              <button
                onClick={() =>
                  setExpanded(
                    isExpanded ? null : category.name
                  )
                }
                className="w-full p-5 text-left"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${category.color}`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-900">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {percentage}% of spending
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-slate-900">
                      ₹{category.amount.toLocaleString()}
                    </p>

                    <div className="mt-1 text-slate-400">
                      {isExpanded ? (
                        <ChevronUp size={17} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </div>

                  </div>

                </div>

                {/* Progress */}
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

              </button>

              {/* Expanded Items */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">

                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Breakdown
                  </p>

                  <div className="space-y-3">

                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-600">
                          {item.name}
                        </span>

                        <span className="text-sm font-medium text-slate-900">
                          ₹{item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default MoneyMap;