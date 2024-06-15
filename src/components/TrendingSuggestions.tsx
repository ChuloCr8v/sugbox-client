import useGetSuggestions from "../hooks/useGetSuggestions";
import TrendingSuggestionCard from "../components/TrendingSuggestionCard";
import { suggestionProps } from "../types";
import { Spin } from "antd";

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
      <p className="font-semibold text-lg ">Trending Suggestions</p>
      <div className="flex gap-4 mt-2 overflow-x-scroll py-2">
        {[...suggestions]
          ?.sort(
            (a: { upVotes: Array<object> }, b: { upVotes: Array<object> }) =>
              b.upVotes.length - a.upVotes.length
          )
          .map((suggestion: suggestionProps) => (
            <a
              href={`/suggestion/${suggestion._id}`}
              className="rounded border shadow p-4 min-w-[350px]"
              key={suggestion._id}
            >
              <TrendingSuggestionCard suggestion={suggestion} />
            </a>
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default TrendingSuggestions;
