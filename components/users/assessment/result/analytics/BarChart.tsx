import React from "react";
// components
import { userResultPayload } from "@components/data";
// chartJS
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [labels, setLabels] = React.useState<any>([]);
  const [datas, setDatas] = React.useState<any>([]);
  // setting y axis labels
  const createYaxisLabels = () => {
    for (let i = userResultPayload.length; i >= 1; i--) {
      setLabels((labels: any) => [...labels, `Q ${i}`]);
    }
  };
  function createBarGraph(largest: any) {
    createYaxisLabels();
    createData(largest);
  }
  function createData(largest: any) {
    let dataPointMatrixStructure: any = [];
    for (let i = 0; i < largest; i++) {
      dataPointMatrixStructure.push({ data: [] });
    }
    addData(dataPointMatrixStructure, largest);
  }
  function addData(dataPointMatrixStructure: any, maxlength: any) {
    for (let i = 0; i < maxlength; i++) {
      userResultPayload.map((pay) => {
        pay.epoch_time[i]
          ? dataPointMatrixStructure[i].data.push([
              pay.epoch_time[i].start_time,
              pay.epoch_time[i].end_time,
            ])
          : dataPointMatrixStructure[i].data.push([null, null]);
      });
    }

    let dataPointMatrix: any = [];
    dataPointMatrixStructure.map((hell: any) => {
      dataPointMatrix.push({ datas: hell.data.reverse() });
    });

    prepareDataset(dataPointMatrixStructure);
  }

  function prepareDataset(data: any) {
    let dataset: any = [];
    data.map((datass: any, index: any) => {
      dataset.push({
        label: `Epoch ${index + 1}`,
        data: datass && datass.data,
        borderColor: `rgb(255, 99, 132)`,
        backgroundColor: `rgba(28, 99, 132, 0.5)`,
      });
    });
    setDatas([...dataset]);
  }
  // finding the questions which has maximum epochs or attempts
  const questionWithMaximumAttempts = () => {
    const maximumAttempts = Math.max(...userResultPayload.map((item) => item.epoch_time.length));
    return maximumAttempts;
  };
  const barChartOptions = {
    indexAxis: "y" as const,
    elements: {},
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "",
      },

      datalabels: {
        color: "green",
        anchor: "center",
        align: "top",
        formatter: function (value: any, context: any) {
          let answer = value[1] - value[0];

          let answer2 = `${value[1] - value[0]} s`;

          return answer > 0 ? answer2 : "";
        },
      },
    },
    responsive: true,

    scales: {
      x: {
        stacked: false,

        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Time(in min)",
        },
      },

      y: {
        stacked: true,
        title: {
          display: true,
          text: "Questions",
        },
      },
    },
  };

  React.useEffect(() => {
    const largest: any = questionWithMaximumAttempts();
    setLabels([]);
    createBarGraph(largest);
  }, []);

  const barChartData = {
    labels: labels,
    datasets: datas,
  };
  return (
    <div className="relative max-h-max w-full border border-[#E2E2E2] mx-auto pb-3">
      <Bar options={barChartOptions} data={barChartData} id="barChart" />
    </div>
  );
};

export default BarChart;
