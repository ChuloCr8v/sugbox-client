import { FaRegLightbulb, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetEmployees from "../hooks/useGetEmployees";
import useGetSuggestions from "../hooks/useGetSuggestions";

const SummaryCardSection = () => {
  const { employees, disabledEmployees, activeEmployees } = useGetEmployees();
  const { suggestions, approvedSuggestions, rejectedSuggestions } =
    useGetSuggestions();

  const summaryData = [
    {
      icon: FaRegUser,
      label: "employees",
      value: employees?.length ?? 0,
      url: "/employees",

      data: [
        {
          label: "total",
          value: employees?.length ?? 0,
        },
        {
          label: "active",
          value: activeEmployees ?? 0,
        },
        {
          label: "disabled",
          value: disabledEmployees?.length ?? 0,
        },
      ],
    },
    {
      icon: FaRegLightbulb,
      label: "suggestions",
      value: suggestions?.length ?? 0,
      url: "/suggestions",
      data: [
        {
          label: "total",
          value: suggestions?.length ?? 0,
        },
        {
          label: "approved",
          value: approvedSuggestions?.length ?? 0,
        },
        {
          label: "rejected",
          value: rejectedSuggestions?.length ?? 0,
        },
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4 items-center">
      {summaryData.map((s, index) => (
        <Link
          key={index}
          className="border rounded-md p-4 pt-2 pb-4 bg-white w-full hover:border-blue-200 duration-200"
          to={s.url}
        >
          <p className="capitalize text-[13px] text-gray-500 font-semibold border-b border-gray-200 mb-4">
            {s.label}
          </p>
          <div className="icon flex justify-between gap-4">
            <div className="flex flex-col items-start text-sm gap-1">
              {s.data.map((d) => (
                <div className="" key={d.label}>
                  <p className=" font-semibold">
                    <span className="text-gray-500 font-normal capitalize">
                      {d.label}:
                    </span>{" "}
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-8 bg-primaryblue text-5xl font-semibold rounded-lg text-white flex flex-col justify-center items-center">
              <s.icon className="text-4xl" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SummaryCardSection;
