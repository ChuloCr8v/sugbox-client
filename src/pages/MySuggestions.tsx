import { useEffect, useState } from "react";
import FilterCards from "../components/FilterCards";
import Filters from "../components/Filters";
import PageHeader from "../components/PageHeader";
import SuggestionTable from "../components/SuggestionTable";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { suggestionProps } from "../types";

const MySuggestions = () => {
  const { userSuggestions, isFetching, isLoading, refetch } =
    useGetSuggestions();
  const [filteredData, setFilteredData] = useState<Array<suggestionProps>>([]);

  const data = userSuggestions
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  useEffect(() => {
    setFilteredData(data);
  }, [userSuggestions]);

  const PageTitle = () => {
    return (
      <div className="flex items-center gap-2">
        <p className="capitalize">my suggestions</p>{" "}
        <div className="bg-primaryblue rounded-full text-white h-6 w-6 flex items-center justify-center">
          {filteredData?.length}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-4 pt-24">
      <div className="grid gap-8">
        <PageHeader title={<PageTitle />} />
        <Filters
          data={userSuggestions}
          isRefreshing={isFetching}
          setFilteredData={setFilteredData}
          refetch={refetch}
        />
      </div>
      <div className="grid gap-4">
        <FilterCards data={filteredData} />
        <SuggestionTable isLoading={isLoading} filteredData={filteredData} />
      </div>
    </div>
  );
};

export default MySuggestions;
