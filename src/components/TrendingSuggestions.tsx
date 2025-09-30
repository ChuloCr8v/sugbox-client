import useGetSuggestions from "../hooks/useGetSuggestions";
import TrendingSuggestionCard from "../components/TrendingSuggestionCard";
import { suggestionProps } from "../types";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const TrendingSuggestions = () => {
  const { suggestions, isLoading: loadingAllSuggestions } = useGetSuggestions();

  if (loadingAllSuggestions) {
    return (
      <div className="w-full flex items-center justify-center gap-3 py-4 border rounded">
        <Spin /> Loading trending suggestions...
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <p className="font-semibold text-lg text-gray-300">Trending</p>
      <div className="flex gap-3 mt-2 overflow-x-scroll py-2">
        {[...suggestions]
          ?.sort(
            (a: { upVotes: Array<object> }, b: { upVotes: Array<object> }) =>
              b.upVotes.length - a.upVotes.length
          )
          .map((suggestion: suggestionProps) => (
            <Link
              to={`/suggestion/${suggestion._id}`}
              key={suggestion._id}
              className="w-full"
            >
              <TrendingSuggestionCard suggestion={suggestion} />
            </Link>
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default TrendingSuggestions;
