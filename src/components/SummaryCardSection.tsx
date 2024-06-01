import { FaLightbulb, FaUsers } from "react-icons/fa";
import useGetEmployees from "../hooks/useGetEmployees";
import useGetSuggestions from "../hooks/useGetSuggestions";

const SummaryCardSection = () => {
  const { employees, disabledEmployees, activeEmployees } = useGetEmployees();
  const { suggestions, approvedSuggestions, rejectedSuggestions } =
    useGetSuggestions();

  // const { others } = UseGetAuth();
  // const dispatch = useDispatch();

  const summaryData = [
    // {
    //   icon: <FaUser />,
    //   label: "Profile",
    //   value: employees.length,
    //   url: "/profile",
    //   button: true,
    //   data: [
    //     {
    //       label: "organization",
    //       value: `${others?.companyName.slice(0, 15)}${
    //         others?.companyName.length > 15 ? "..." : ""
    //       }`,
    //     },
    //     {
    //       label: "email",
    //       value: others?.companyEmail,
    //     },
    //     {
    //       label: "created on",
    //       value: dayjs(others?.createdAt).format("DD.MM.YYYY"),
    //     },
    //   ],
    // },
    {
      icon: <FaUsers />,
      label: "employees",
      value: employees?.length,
      url: "/employees",

      data: [
        {
          label: "total",
          value: employees?.length,
        },
        {
          label: "active",
          value: activeEmployees,
        },
        {
          label: "disabled",
          value: disabledEmployees?.length,
        },
      ],
    },
    {
      icon: <FaLightbulb />,
      label: "suggestions",
      value: suggestions?.length,
      url: "/suggestions",
      data: [
        {
          label: "total",
          value: suggestions?.length,
        },
        {
          label: "approved",
          value: approvedSuggestions?.length,
        },
        {
          label: "rejected",
          value: rejectedSuggestions?.length,
        },
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4 items-center">
      {summaryData.map((s, index) => (
        <a
          // onClick={(e) => {
          //   if (s.button) {
          //     e.stopPropagation();
          //     e.preventDefault();
          //     dispatch(showEditCompanyModal());
          //     return;
          //   }
          // }}
          key={index}
          className="border rounded-md p-4 pt-2 pb-4 bg-white w-full hover:border-blue-200 duration-200"
          href={s.url}
        >
          <p className="uppercase text-[13px] text-gray-500 font-semibold border-b border-gray-200 mb-4">
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
            <div className="p-1 h-[68px] w-[68px] bg-primaryblue text-5xl font-semibold rounded-lg text-white flex flex-col justify-center items-center">
              {s.icon}{" "}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SummaryCardSection;
