import { useEffect, useState } from "react";
import {
  CalendarDays,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getGoals } from "../utils/storage";

function Future() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  const totalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.target || 0),
    0
  );

  const totalSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.saved || 0),
    0
  );

  const remaining = Math.max(totalTarget - totalSaved, 0);

  // Estimated monthly savings
  const monthlySaving = 2000;

  const monthsNeeded = remaining
    ? Math.ceil(remaining / monthlySaving)
    : 0;

  const progress = totalTarget
    ? Math.min(
        Math.round((totalSaved / totalTarget) * 100),
        100
      )
    : 0;

  const futureDate = () => {
    const date = new Date();

    date.setMonth(
      date.getMonth() + monthsNeeded
    );

    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const stats = [
    ["Total target", totalTarget],
    ["Already saved", totalSaved],
    ["Remaining", remaining],
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* HERO */}

      <section className="relative overflow-hidden rounded-[30px] border border-indigo-400/20 bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-900 p-7 text-white shadow-2xl shadow-indigo-950/30 sm:p-9">

        <div className="absolute -right-14 -top-16 h-48 w-48 rounded-full bg-indigo-400/15 blur-2xl" />

        <div className="absolute -bottom-20 left-20 h-44 w-44 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative">

          <div className="flex items-center gap-2 text-sm text-indigo-200/80">
            <Sparkles size={16} />
            Plan ahead
          </div>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Your Future
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            See where your savings could take you and stay focused
            on your next milestone.
          </p>

        </div>

      </section>


      {/* FORECAST */}

      <section className="grid gap-6 lg:grid-cols-3">

        {/* SAVINGS FORECAST */}

        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-7 shadow-xl shadow-black/10 backdrop-blur-sm lg:col-span-2">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 ring-1 ring-indigo-400/10">
              <TrendingUp size={22} />
            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Savings forecast
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                You're building momentum
              </h2>

            </div>

          </div>


          {/* STATS */}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">

            {stats.map(([label, value]) => (

              <div
                key={label}
                className="rounded-2xl border border-white/5 bg-white/[0.04] p-5"
              >

                <p className="text-xs text-slate-500">
                  {label}
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  ₹{value.toLocaleString("en-IN")}
                </p>

              </div>

            ))}

          </div>


          {/* PROGRESS */}

          <div className="mt-7">

            <div className="flex justify-between text-xs">

              <span className="font-medium text-slate-400">
                Overall progress
              </span>

              <span className="font-bold text-indigo-300">
                {progress}%
              </span>

            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/[0.06]">

              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* TIMELINE */}

        <div className="rounded-[28px] border border-indigo-400/20 bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-900 p-7 text-white shadow-xl shadow-indigo-950/30">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <CalendarDays size={22} />
          </div>

          <p className="mt-7 text-xs font-medium text-indigo-200/70">
            ESTIMATED TIMELINE
          </p>

          {remaining ? (
            <>

              <h2 className="mt-2 text-3xl font-bold">
                {monthsNeeded}
              </h2>

              <p className="mt-1 text-sm text-white/70">
                months to reach your current targets
              </p>

              <div className="mt-6 rounded-xl bg-white/10 p-4">

                <p className="text-xs text-white/60">
                  Estimated completion
                </p>

                <p className="mt-1 font-semibold">
                  {futureDate()}
                </p>

              </div>

            </>
          ) : (
            <>

              <h2 className="mt-5 text-2xl font-bold">
                All set 🎉
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/70">
                You've reached all your current savings targets.
              </p>

            </>
          )}

        </div>

      </section>


      {/* MILESTONES */}

      <section>

        <div className="mb-5">

          <h2 className="font-bold text-white">
            Your future milestones
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            A simple view of where your goals are heading.
          </p>

        </div>


        {!goals.length ? (

          <div className="rounded-[28px] border border-dashed border-white/15 bg-slate-900/60 p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300">
              <Target size={25} />
            </div>

            <h3 className="mt-4 font-bold text-white">
              Nothing planned yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a goal in Money Map to see your future
              milestones here.
            </p>

            <button
              onClick={() => navigate("/money-map")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5"
            >
              Create a Goal
              <ArrowRight size={15} />
            </button>

          </div>

        ) : (

          <div className="space-y-4">

            {goals.map((goal, index) => {

              const target = Number(goal.target || 0);
              const saved = Number(goal.saved || 0);

              const left = Math.max(
                target - saved,
                0
              );

              const goalProgress = target
                ? Math.min(
                    Math.round(
                      (saved / target) * 100
                    ),
                    100
                  )
                : 0;

              const months = left
                ? Math.ceil(
                    left / monthlySaving
                  )
                : 0;

              return (

                <div
                  key={goal.id}
                  className="flex flex-col gap-5 rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-indigo-400/20 sm:flex-row sm:items-center"
                >

                  {/* NUMBER */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-sm font-bold text-indigo-300 ring-1 ring-indigo-400/10">

                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}

                  </div>


                  {/* GOAL DETAILS */}

                  <div className="min-w-0 flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="truncate font-bold text-white">
                        {goal.name}
                      </h3>

                      <span className="text-xs font-bold text-indigo-300">
                        {goalProgress}%
                      </span>

                    </div>


                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-700"
                        style={{
                          width: `${goalProgress}%`,
                        }}
                      />

                    </div>


                    <p className="mt-2 text-xs text-slate-500">

                      ₹{saved.toLocaleString("en-IN")}
                      {" "}saved of{" "}
                      ₹{target.toLocaleString("en-IN")}

                    </p>

                  </div>


                  {/* ESTIMATE */}

                  <div className="rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3 sm:min-w-[130px]">

                    <p className="text-[10px] uppercase tracking-wide text-slate-600">

                      {left
                        ? "Estimated"
                        : "Status"}

                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-200">

                      {left
                        ? `${months} month${
                            months !== 1
                              ? "s"
                              : ""
                          }`
                        : "Completed 🎉"}

                    </p>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>


      {/* TIP */}

      <section className="relative overflow-hidden rounded-[28px] border border-indigo-400/10 bg-gradient-to-r from-indigo-950/70 via-violet-950/60 to-slate-900 p-6 shadow-xl shadow-black/10">

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300">
            <Sparkles size={19} />
          </div>

          <div>

            <h3 className="font-bold text-white">
              Small steps become big milestones
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">

              The forecast is based on ₹
              {monthlySaving.toLocaleString("en-IN")}
              {" "}monthly savings. Increase your savings
              to reach your goals sooner.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Future;