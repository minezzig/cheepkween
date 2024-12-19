import { createClient } from "@/utils/supabase/server";
import Chart from "./components/Chart";
import CircleContainer from "./components/CircleContainer";

export default async function Dashboard() {
  // select all data from database
  const supabase = createClient();
  const { data: purchases, error } = await supabase.from("purchases").select();

  // total amount spent on purchases this week
  const getWeeklyTotal = () => {
    const newDate = new Date();
    // calculate the sunday start of the week
    const weekStart = new Date(
      newDate.setDate(newDate.getDate() - newDate.getDay()),
    );

    const weeklySpending = purchases?.filter((purchase) => {
      const purchaseDate = new Date(purchase.purchase_date);
      return purchaseDate >= weekStart;
    });

    const weeklySum = weeklySpending?.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    return weeklySum.toFixed(2);
  };

  // total amount spent on purchaes this month
  const monthlyTotal = () => {
    return purchases
      ?.filter(
        (purchase) =>
          new Date().getMonth() === new Date(purchase.purchase_date).getMonth(),
      )
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  };

  // get current month
  const getCurrentMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth =
      months[new Date().getMonth()] + " " + new Date().getFullYear();
    return currentMonth;
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20 bg-yellow-50">
      <div className="animate-in flex max-w-4xl flex-1 flex-col items-center justify-between px-3 md:px-10 opacity-0">
        <div>
          <div>
            <div>Dashboard</div>
            <div className="mb-6 text-4xl font-bold">{getCurrentMonth()}</div>
          </div>
          <div>
            <p>
              Welcome to your dashboard. view your spending here. or navigate to
              another page to view products and add items.
            </p>
          </div>
        </div>
        {purchases && purchases.length > 0 ? (
          <div className="my-5 flex w-full items-center justify-center gap-10">
            <CircleContainer title={"Week"} total={getWeeklyTotal()} />
            <CircleContainer title={"Month"} total={monthlyTotal()} />
          </div>
        ) : (
          <h1>No data yet</h1>
        )}

        {purchases && <Chart purchases={purchases} />}
      </div>
    </div>
  );
}
