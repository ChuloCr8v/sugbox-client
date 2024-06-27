import { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa";
import Employees from "../components/Employees";
import ErrorComponent from "../components/ErrorComponent";
import FilterCards from "../components/FilterCards";
import Filters from "../components/Filters";
import PageHeader from "../components/PageHeader";
//import SpinLoading from "../components/SpinLoading";
import SuggestionCards from "../components/SuggestionCards";
import Suggestions from "../components/Suggestions";
import SummaryCardSection from "../components/SummaryCardSection";
import UseGetAuth from "../hooks/useGetAuth";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { useGetEmployeeQuery } from "../redux/data/employees";

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
    <p className="">
      Hello {employee?.firstName}, <br className=" md:hidden" />
      any{" "}
      <span className="text-primaryblue font-semibold capitalize">
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

  if (isError) {
    return <ErrorComponent />;
  }

  // if (isLoadingSuggestions) {
  //   return <SpinLoading />;
  // }

  return (
    <div className="w-full grid gap-4 px-4 py-24">
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
            data={filteredData}
            setFilteredData={setFilteredData}
            isRefreshing={isRefreshing}
            refetch={refetch}
            isLoading={isLoadingSuggestions}
          />
          <Employees />
        </div>
      )}

      {!isAdmin &&
        (isError || error ? (
          <p className="text-center text-gray-600 font-semibold w-full mt-20 flex flex-col items-center justify-center gap-4">
            <FaBan className=" bg-gray-100 text-5xl text-gray-400 h-24 w-24 rounded-full p-6" />
            Unable to get suggestions, check your internet and try again!
          </p>
        ) : (
          <SuggestionCards
            data={filteredData}
            isLoading={isLoadingSuggestions}
          />
        ))}
    </div>
  );
};

export default Dashboard;
