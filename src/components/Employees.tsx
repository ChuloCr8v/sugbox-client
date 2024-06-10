import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useGetEmployees from "../hooks/useGetEmployees";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeStatusTag from "./EmployeeStatusTag";
import PageHeader from "./PageHeader";
import PieChartComponent from "./PieChart";
import { NoDataComponent, SectionHeading } from "./Suggestions";
import Table from "./Table";
import { useGetEmployeesQuery } from "../redux/data/employees";
import UseGetAuth from "../hooks/useGetAuth";
import Loading from "./Loading";

const Employees = () => {
  const { data, isLoading } = useGetEmployeesQuery("");
  const { employees, activeEmployees, disabledEmployees, refetch, isFetching } =
    useGetEmployees();
  const [filteredData, setFilteredData] = useState(data);

  const { user } = UseGetAuth();

  console.log(user);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (
        _: ReactNode,
        record: { _id: string; firstName: string; lastName: string }
      ) => (
        <a
          href={`/profile/${record._id}`}
          className="capitalize font-bold text-primaryblue"
        >
          {record.firstName + " " + record.lastName}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: ReactNode, record: { isDisabled: boolean }) => (
        <EmployeeStatusTag status={record.isDisabled} />
      ),
    },
    {
      title: "Role",
      align: "left",
      dataIndex: "adminRole",
      render: (_: any, records: { adminRole: string }) => {
        return (
          <p
            className={twMerge(
              "capitalize ",
              records.adminRole === "moderator" && "text-primaryblue"
            )}
          >
            {records.adminRole}
          </p>
        );
      },
    },
  ];

  const pieChartData = [
    {
      id: 0,
      value: activeEmployees,
      label: "Active",
      color: "#16a34a",
    },
    {
      id: 1,
      value: disabledEmployees?.length,
      label: "Disabled",
      color: "lightgray",
    },
  ];

  const NoDataMessage = (
    <p className="text-center">
      Uh oh! No employees for your organization yet.
      <span className="block mt-1"> Start adding employees now!</span>
    </p>
  );

  useEffect(() => {
    data && setFilteredData(data);
  }, [data]);
  const currentPage = window.location.href;

  return (
    <section className="w-full">
      <div className="">
        <div className="table w-full space-y-4">
          {currentPage.includes("dashboard") ? (
            <SectionHeading
              heading={"Employees"}
              count={filteredData?.length}
            />
          ) : (
            <PageHeader
              title={"Employees"}
              showActionButton={currentPage.includes("employees")}
            />
          )}
          <div
            className={twMerge(
              "!mt-8 w-full",
              currentPage.includes("dashboard") && "!mt-4"
            )}
          >
            <EmployeeFilters
              data={employees}
              isRefreshing={isFetching}
              setFilteredData={setFilteredData}
              refetch={refetch}
            />

            {isLoading ? (
              <Loading />
            ) : !employees?.length ? (
              <NoDataComponent message={NoDataMessage} />
            ) : (
              <div className="mt-4 flex gap-4 w-full">
                <Table
                  data={filteredData}
                  columns={columns}
                  key={filteredData}
                />

                <PieChartComponent data={pieChartData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employees;
