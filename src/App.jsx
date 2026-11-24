import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import MoneyMap from "./pages/MoneyMap";
import Future from "./pages/Future";

function Placeholder({ title }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <h1 className="text-2xl font-semibold text-slate-900">
        {title}
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Money Map */}
          <Route
            path="/money-map"
            element={<MoneyMap />}
          />

          {/* Add Expense */}
          <Route
            path="/add-expense"
            element={<AddExpense />}
          />

          {/* Future */}
          <Route
            path="/future"
            element={<Future/>}
          />

          {/* Understand */}
          <Route
            path="/understand"
            element={<Placeholder title="Understand" />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;