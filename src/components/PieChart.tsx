import { PieChart } from "@mui/x-charts/PieChart";
import { twMerge } from "tailwind-merge";

type Props = {
  data: { id: number; value: number; label: string; color: string }[];
};

const PieChartComponent = (props: Props) => {
  const Legend = () => {
    return (
      <div className="flex flex-col items-start gap-4 -translate-x-20">
        {props.data.map((item) => (
          <div className="flex items-center gap-2">
            <div
              style={{ background: item.color }}
              className={twMerge(`h-4 w-4 rounded-lg`)}
            ></div>
            <p className="">{item.label}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white hidden xl:flex  items-center justify-center rounded border max-w-[300px]">
      <PieChart
        series={[
          {
            data: props.data,
            innerRadius: 0,
            outerRadius: 80,
            paddingAngle: 1,
            cornerRadius: 5,
          },
        ]}
        width={400}
        height={200}
        slotProps={{
          legend: { hidden: true },
        }}
      />

      <Legend />
    </div>
  );
};

export default PieChartComponent;
