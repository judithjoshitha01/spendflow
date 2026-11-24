import { useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Food", icon: "🍔" },
  { name: "Travel", icon: "🚌" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Education", icon: "📚" },
];

const payments = [
  { name: "UPI", icon: Smartphone },
  { name: "Cash", icon: Wallet },
  { name: "Card", icon: CreditCard },
];

const moods = [
  { name: "Worth it", emoji: "😊" },
  { name: "Normal", emoji: "😐" },
  { name: "Regret", emoji: "😬" },
];

function AddExpense() {
  const navigate = useNavigate();
  const amountRef = useRef(null);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [mood, setMood] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description || !category || !payment) {
      alert("Please fill all required fields.");
      return;
    }

    const expense = {
      id: Date.now(),
      amount: Number(amount),
      description,
      category,
      payment,
      mood,
      date: new Date().toISOString(),
    };

    const existingExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];

    localStorage.setItem(
      "expenses",
      JSON.stringify([...existingExpenses, expense])
    );

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      {/* Heading */}
      <div className="mb-8">
        <p className="text-sm text-indigo-600">
          Track a new expense
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Add Expense
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Keep your spending story up to date.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Amount
          </label>

          <div className="mt-2 flex items-center rounded-2xl border border-slate-200 px-5 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
            <span className="text-2xl font-semibold text-slate-400">
              ₹
            </span>

            <input
              ref={amountRef}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="ml-3 w-full bg-transparent text-3xl font-semibold text-slate-900 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-7">
          <label className="text-sm font-medium text-slate-700">
            What did you spend on?
          </label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Lunch with friends"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
          />
        </div>

        {/* Category */}
        <div className="mt-7">
          <label className="text-sm font-medium text-slate-700">
            Category
          </label>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((item) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setCategory(item.name)}
                className={`rounded-2xl border p-4 text-center transition ${
                  category === item.name
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">
                  {item.icon}
                </span>

                <p className="mt-2 text-xs font-medium">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="mt-7">
          <label className="text-sm font-medium text-slate-700">
            Payment method
          </label>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {payments.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => setPayment(item.name)}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 text-sm transition ${
                    payment === item.name
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <Icon size={17} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood */}
        <div className="mt-7">
          <label className="text-sm font-medium text-slate-700">
            Was it worth it?
          </label>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {moods.map((item) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setMood(item.name)}
                className={`rounded-2xl border p-3 text-center transition ${
                  mood === item.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-xl">
                  {item.emoji}
                </span>

                <p className="mt-1 text-xs text-slate-600">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          {showSuccess ? (
            <>
              <Check size={19} />
              Expense Added
            </>
          ) : (
            "Save Expense"
          )}
        </button>

      </form>
    </div>
  );
}

export default AddExpense;