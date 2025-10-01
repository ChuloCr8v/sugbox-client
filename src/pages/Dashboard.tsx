import { useEffect, useState } from "react";
import Employees from "../components/Employees";
import FilterCards from "../components/FilterCards";
import Filters from "../components/Filters";
import PageHeader from "../components/PageHeader";
import SuggestionCards from "../components/SuggestionCards";
import Suggestions, { SectionHeading } from "../components/Suggestions";
import SummaryCardSection from "../components/SummaryCardSection";
import UseGetAuth from "../hooks/useGetAuth";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { useGetEmployeeQuery } from "../redux/data/employees";
import ErrorComponent from "../components/ErrorComponent";

const Dashboard = () => {
  const {
    suggestions,
    isLoading: isLoadingSuggestions,
    refetch,
    isFetching: isRefreshing,
    isError,
    error,
  } = useGetSuggestions();
  const [filteredData, setFilteredData] = useState([]);
  const { isAdmin, id, user } = UseGetAuth();

  const { data: employee } = useGetEmployeeQuery(id);

  const data = suggestions
    ?.slice()
    .sort(
      (a: { createdAt: Date }, b: { createdAt: Date }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  useEffect(() => {
    data && setFilteredData(data);
  }, [suggestions]);

  const userProfileTitle = (
    <p className="text-gray-600 dark:text-gray-300">
      Hello {employee?.firstName}, <br className=" md:hidden" />
      any{" "}
      <span className="text-secondary font-semibold capitalize">
        {" "}
        bright ideas
      </span>{" "}
      today?
    </p>
  );

  const adminProfileTitle = (
    <p className=" font-semibold">
      <span className="text-primaryblue hidden">{user?.companyName}'s </span>
      Dashboard
    </p>
  );

  // if (isError) {
  //   return <ErrorComponent />;
  // }

  return (
    <div className="w-full h-full grid gap-4 px-4 py-24  ">
      <PageHeader
        title={isAdmin ? adminProfileTitle : userProfileTitle}
        showActionButton
      />
      {!isAdmin && (
        <Filters
          setFilteredData={setFilteredData}
          isRefreshing={isRefreshing}
          refetch={refetch}
          data={data}
        />
      )}
      {!isAdmin && <FilterCards data={filteredData} />}
      {isAdmin && (
        <div className="space-y-6 ">
          <SummaryCardSection />
          <Suggestions
            showFilter={false}
            data={filteredData}
            setFilteredData={setFilteredData}
            isRefreshing={isRefreshing}
            refetch={refetch}
            isLoading={isLoadingSuggestions}
          />
          <Employees showFilter={false} />
        </div>
      )}

      {!isAdmin &&
        (isError || error ? (
          <ErrorComponent className="h-fit !bg-transparent !from-transparent !to-transparent md:mt-32" />
        ) : (
          <div className="mt-2">
            <SectionHeading
              heading="Latest Suggestions"
              count={filteredData?.length}
            />
            <SuggestionCards
              data={filteredData}
              isLoading={isLoadingSuggestions}
            />
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
