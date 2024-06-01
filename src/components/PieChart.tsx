import { PieChart } from "@mui/x-charts/PieChart";

type Props = {
  data: { id: number; value: number; label: string; color: string }[];
};

const PieChartComponent = (props: Props) => {
  return (
    <div className="bg-white hidden lg:flex items-center justify-center rounded border p-4">
      <PieChart
        series={[
          {
            data: props.data,
            innerRadius: 0,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 5,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default PieChartComponent;
