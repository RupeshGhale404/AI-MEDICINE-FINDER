import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import type { RecentMedicine } from "../../types/Dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  medicines: RecentMedicine[];
}

const InventoryChart = ({ medicines }: Props) => {
  const data = {
    labels: medicines.map((m) => m.name),

    datasets: [
      {
        label: "Stock Quantity",
        data: medicines.map((m) => m.stock_quantity),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EF4444",
          "#06B6D4",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Medicine Stock Overview",
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <Bar data={data} options={options} />
    </div>
  );
};

export default InventoryChart;