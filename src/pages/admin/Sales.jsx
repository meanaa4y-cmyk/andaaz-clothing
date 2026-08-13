import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { salesChartData } from "../../data/mockData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Sales() {
  const data = {
    labels: salesChartData.labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: salesChartData.data,
        borderColor: "#C9A227",
        backgroundColor: "rgba(201, 162, 39, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
          Performance &bull; Financial Overview
        </span>
        <h1 className="font-luxury text-3xl font-bold text-stone-900 mt-1">View Sales Analytics</h1>
      </div>
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500">Average Order Value</span>
            <div className="font-luxury text-2xl font-bold text-stone-900 mt-1">$295.40</div>
          </div>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500">Conversion Rate</span>
            <div className="font-luxury text-2xl font-bold text-emerald-600 mt-1">4.8%</div>
          </div>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500">Monthly Growth</span>
            <div className="font-luxury text-2xl font-bold text-brand-accent mt-1">+14.2%</div>
          </div>
        </div>
        <h3 className="font-luxury font-bold text-lg mb-4 text-stone-800">
          Monthly Revenue Overview (2026)
        </h3>
        <div className="h-80 relative">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
}
