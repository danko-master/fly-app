import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartByDay = (props) => {
  const data = {
    labels: Array.from({ length: 366 }, (v, i) => i + 1),
    datasets: [
      {
        label: "Количество полётов",
        data: props.data,
        fill: false,
        backgroundColor: "#00a896",
        borderColor: "#02c39a",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Динамика по дням по всем регионам",
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar key="daily" options={options} data={data} />
    </div>
  );
};

export default ChartByDay;
