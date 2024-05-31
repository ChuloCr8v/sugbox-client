import { useEffect, useState } from "react";
import Suggestions from "../components/Suggestions";
import useGetSuggestions from "../hooks/useGetSuggestions";

const employees = () => {
  const [filteredData, setFilteredData] = useState([]);
  const { suggestions, refetch, isLoading } = useGetSuggestions();

  useEffect(() => {
    setFilteredData(suggestions);
  }, [suggestions]);

  return (
    <div className="pt-24 w-full min-h-screen flex flex-col px-6">
      <Suggestions
        data={filteredData}
        refetch={refetch}
        isRefreshing={isLoading}
        setFilteredData={setFilteredData}
      />
    </div>
  );
};

export default employees;
