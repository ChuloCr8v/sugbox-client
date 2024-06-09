import { Dispatch, ReactNode, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { useGetEmployeesQuery } from "../redux/data/employees";
import Filters from "./Filters";
import PageHeader from "./PageHeader";
import PieChartComponent from "./PieChart";
import SuggestionStatusTag from "./SuggestionStatusTag";
import Table from "./Table";

interface Props {
  data: Array<object>;
  refetch: () => void;
  isRefreshing: boolean;
  setFilteredData: Dispatch<SetStateAction<never[]>>;
}

const Suggestions = (props: Props) => {
  const {
    suggestions,
    approvedSuggestions,
    rejectedSuggestions,
    pendingSuggestions,
  } = useGetSuggestions();
  const { data: employees } = useGetEmployeesQuery("");

  const currentPage = window.location.href;

  const suggester = (userId: string) => {
    const res = employees.find(
      (employee: { _id: string }) => employee._id === userId
    );
    return res.firstName + " " + res.lastName;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_: ReactNode, record: { title: string; _id: string }) => (
        <a
          href={`/suggestion/${record._id}`}
          className="capitalize font-bold text-primaryblue"
        >
          {record?.title.slice(0, 20)}
          {record?.title?.length > 20 ? "..." : ""}
        </a>
      ),
    },
    {
      title: "Suggester",
      dataIndex: "suggester",
      key: "suggester",
      render: (
        _: ReactNode,
        record: {
          isAnonymous: boolean;
          userId: string;
          upVotes: [];
        }
      ) =>
        record.isAnonymous ? (
          "Anonymous"
        ) : (
          <p className="">{suggester(record.userId)}</p>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "upvotes",
      render: (_: ReactNode, record: { status: string }) => (
        <SuggestionStatusTag status={record?.status} />
      ),
    },
    {
      title: "Upvotes",
      dataIndex: "upvotes",
      key: "upvotes",
      align: "center",

      render: (_: ReactNode, record: { upVotes: [] }) => (
        <p className="">{record?.upVotes?.length}</p>
      ),
    },
    {
      title: "downvotes",
      align: "center",
      dataIndex: "upvotes",
      key: "upvotes",
      render: (_: ReactNode, record: { downVotes: [] }) => (
        <p className="">{record?.downVotes?.length}</p>
      ),
    },
  ];

  const pieChartData = [
    {
      id: 0,
      value: approvedSuggestions?.length,
      label: "Approved",
      color: "#0275ff",
    },
    {
      id: 1,
      value: rejectedSuggestions?.length,
      label: "Rejected",
      color: "#ef4477",
    },
    {
      id: 2,
      value: pendingSuggestions?.length,
      label: "Pending",
      color: "#f97316",
    },
  ];

  console.log(currentPage);

  const NoDataMessage = (
    <p className="text-center">
      Uh oh! No Suggestions for your organization yet.
      <span className="block mt-1"> Ask your employees what they think?</span>
    </p>
  );

  return (
    <section>
      <div className="">
        <div className=" w-full">
          {currentPage.includes("dashboard") ? (
            <SectionHeading
              heading={"Suggestions"}
              count={props.data?.length}
            />
          ) : (
            <PageHeader title={"Suggestions"} />
          )}

          <div
            className={twMerge(
              "!mt-8",
              currentPage.includes("dashboard") && "!mt-4"
            )}
          >
            <Filters
              data={suggestions}
              isRefreshing={props.isRefreshing}
              setFilteredData={props.setFilteredData}
              refetch={props.refetch}
            />
            {!suggestions?.length ? (
              <NoDataComponent message={NoDataMessage} />
            ) : (
              <div className="mt-4 flex gap-4">
                <Table data={props.data} columns={columns} pageSize={4} />
                <PieChartComponent data={pieChartData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suggestions;

export const SectionHeading = (props: {
  count?: number;
  heading: ReactNode;
}) => {
  return (
    <h3 className="font-semibold text-lg text-left flex items-center gap-1">
      {props.heading}

      <span className="border border-primaryblue rounded-full text-[12px] text-primaryblue h-5 w-5 flex items-center justify-center">
        {props?.count && props?.count > 0 ? props.count : 0}
      </span>
    </h3>
  );
};

export const NoDataComponent = (props: { message: ReactNode }) => {
  return (
    <div className="border rounded py-10 text-gray-600 mt-4 w-full text-center">
      <h1 className="text-sm font-semibold">{props.message}</h1>
    </div>
  );
};
