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

const ChartByWeek = (props) => {
  const data = {
    labels: Array.from({ length: 53 }, (v, i) => i + 1),
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
        text: "Динамика по неделям по всем регионам",
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar key="weekly" options={options} height={150} data={data} />
    </div>
  );
};

export default ChartByWeek;
