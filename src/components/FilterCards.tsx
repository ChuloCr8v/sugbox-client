import FilterCard from "./FilterCard";
import CardWrapper from "./global/CardWrapper";

interface Props {
  data: { status: string }[];
}

const FilterCards = (props: Props) => {
  const pending = props.data?.filter((d) =>
    d.status.toLowerCase().includes("pending")
  );
  const approved = props.data?.filter((d) =>
    d.status.toLowerCase().includes("approved")
  );
  const rejected = props.data?.filter((d) =>
    d.status.toLowerCase().includes("rejected")
  );
  const filters = [
    { title: "total", number: props.data?.length },
    { title: "pending", number: pending?.length },
    { title: "approved", number: approved?.length },
    { title: "rejected", number: rejected?.length },
  ];

  return (
    <CardWrapper className="max-md:from-transparent max-md:grid max-md:grid-cols-2 p-4 max-md:p-0 max-md:gap-2 max-md:border-0">
      {filters.map((d, index) => (
        <FilterCard data={d} key={index} index={index + 1} />
      ))}
    </CardWrapper>
  );
};

export default FilterCards;
