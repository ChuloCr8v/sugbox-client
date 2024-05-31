import { useEffect, useState } from "react";
import { useGetSuggestionsQuery } from "../redux/data/suggestions";
import UseGetAuth from "./useGetAuth";
import { suggestionProps } from "../types";

const useGetSuggestions = () => {
  const { user } = UseGetAuth();
  const id = user?.isAdmin ? user?._id : user.companyId;
  const [userSuggestions, setUserSuggestions] = useState<
    Array<suggestionProps>
  >([]);

  const {
    data: suggestions,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
  } = useGetSuggestionsQuery(id);

  const [filter, setFilter] = useState("total");

  const approvedSuggestions = suggestions?.filter(
    (s: { status: string }) => s.status === "approved"
  );
  const rejectedSuggestions = suggestions?.filter(
    (s: { status: string }) => s.status === "rejected"
  );
  const pendingSuggestions = suggestions?.filter(
    (s: { status: string }) => s.status === "pending"
  );

  useEffect(() => {
    const getUserSuggestions = suggestions?.filter(
      (s: { userId: string }) => s.userId === user._id
    );
    setUserSuggestions(getUserSuggestions);
  }, [suggestions]);

  return {
    isLoading,
    isFetching,
    suggestions,
    filter,
    setFilter,
    approvedSuggestions,
    rejectedSuggestions,
    pendingSuggestions,
    userSuggestions,
    refetch,
    isError,
    error,
  };
};

export default useGetSuggestions;
