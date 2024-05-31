import { suggestionProps } from "../types";
import Loading from "./Loading";
import SuggestionCard from "./SuggestionCard";

interface Props {
  isLoading: boolean;
  data: Array<suggestionProps>;
}

const SuggestionCards = (props: Props) => {
  if (props.isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {props.data?.map((s, index) => (
        <SuggestionCard data={s} key={index} isLoading={props.isLoading} />
      ))}
    </div>
  );
};

export default SuggestionCards;
