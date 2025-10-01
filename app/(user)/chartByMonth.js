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

const ChartByMonth = (props) => {
  const data = {
    labels: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
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
        text: "Динамика по месяцам по всем регионам",
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar key="monthly" options={options} data={data} />
    </div>
  );
};

export default ChartByMonth;
